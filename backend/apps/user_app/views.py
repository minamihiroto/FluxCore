from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    username = data['username']
    password = data['password']
    email = data['email']

    if User.objects.filter(email=email).exists():
        return Response({'error': 'A user with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email, is_active=False)
    token = default_token_generator.make_token(user)
    
    send_activation_email(user, token)

    refresh = RefreshToken.for_user(user)
    res_data = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

    return Response(res_data, status=status.HTTP_201_CREATED)

def send_activation_email(user, token):
    activation_url = f"{settings.FRONTEND_URL}/login/?user_id_b64={urlsafe_base64_encode(force_bytes(user.pk))}&token={token}"
    subject = 'Activate your account'
    message = f"Hello {user.username},\n\nPlease click the link below to activate your account:\n{activation_url}"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)

@api_view(['GET'])
@permission_classes([AllowAny])
def activate(request, user_id_b64, token):
    try:
        user_id = force_str(urlsafe_base64_decode(user_id_b64))
        user = User.objects.get(pk=user_id)

        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'message': 'Account successfully activated'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({'error': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=400)
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        res_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(res_data)
    else:
        return Response({'error': 'Invalid credentials'}, status=401)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user(request):
    user = request.user
    data = {
        'username': user.username,
        'email': user.email,
    }
    return Response(data)