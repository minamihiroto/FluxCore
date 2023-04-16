from django.http import JsonResponse
from py2neo import Graph, Node
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

graph = Graph(os.environ.get('BOLT_URL'), auth=(os.environ.get('BOLT_USER'), os.environ.get('BOLT_PASSWORD')))

def create_box(request):
    box_name = request.POST.get("name")
    box = Node("Box", name=box_name, created_at=datetime.now(), updated_at=datetime.now())
    graph.create(box)
    return JsonResponse({"status": "success"})
