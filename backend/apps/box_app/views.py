from django.http import JsonResponse
from py2neo import Graph, Node
from datetime import datetime
import os
from dotenv import load_dotenv
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
graph = Graph(os.environ.get('BOLT_URL'), auth=(os.environ.get('BOLT_USER'), os.environ.get('BOLT_PASSWORD')))

@csrf_exempt
def create_box(request):
    data = json.loads(request.body)
    box_name = data.get("name")
    created_by = data.get("user_id")
    box = Node("Box", name=box_name, created_by=created_by, created_at=datetime.now(), updated_at=datetime.now())
    graph.create(box)
    return JsonResponse({"status": "success"})

# Box一覧を取得するエンドポイント
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_boxes(request):
    user_id = request.user.id
    query = f"MATCH (b:Box) WHERE b.created_by = {user_id} RETURN b"
    result = graph.run(query)
    boxes = []

    for record in result:
        box = record['b']
        boxes.append({"id": box.identity, "name": box['name'], "created_by": box['created_by']})

    return JsonResponse({"boxes": boxes})
