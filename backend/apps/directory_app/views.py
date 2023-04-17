from django.http import JsonResponse
from py2neo import Graph, Node, Relationship
from datetime import datetime
import os
from dotenv import load_dotenv
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
graph = Graph(os.environ.get('BOLT_URL'), auth=(os.environ.get('BOLT_USER'), os.environ.get('BOLT_PASSWORD')))

@api_view(['POST'])
@csrf_exempt
def create_directory(request):
    data = json.loads(request.body)
    directory_name = data.get("name")
    created_by = data.get("user_id")
    box_id = data.get("box_id")

    query = f"MATCH (b:Box) WHERE ID(b) = {box_id} RETURN b"
    box_data = graph.run(query).data()
    if not box_data:
        return JsonResponse({"error": "Box not found"})
    
    box_node = box_data[0]['b']

    directory = Node("Directory", name=directory_name, created_by=created_by, created_at=datetime.now(), updated_at=datetime.now())
    graph.create(directory)

    child_rel = Relationship(box_node, "child", directory)
    graph.create(child_rel)

    return JsonResponse({"status": "success"})
