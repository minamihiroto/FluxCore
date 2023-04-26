from django.http import JsonResponse
from py2neo import Graph, Node
from datetime import datetime
import os
from dotenv import load_dotenv
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
from rest_framework import status

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
graph = Graph(os.environ.get('BOLT_URL'), auth=(
    os.environ.get('BOLT_USER'), os.environ.get('BOLT_PASSWORD')))


@csrf_exempt
def create_box(request):
    data = json.loads(request.body)
    box_name = data.get("name")
    box_explain = data.get("explain")
    created_by = data.get("user_id")
    box = Node("Box", name=box_name, explain=box_explain, created_by=created_by,
               created_at=datetime.now(), updated_at=datetime.now())
    graph.create(box)
    return JsonResponse({"status": "success"})

@api_view(['GET'])
def get_boxes(request):
    query = f"MATCH (b:Box) RETURN b"
    result = graph.run(query)
    boxes = []

    for record in result:
        box = record['b']
        boxes.append(
            {"id": box.identity, "name": box['name'], "created_by": box['created_by']})

    return JsonResponse({"boxes": boxes})


def get_box_details(request, box_id):
    query = f"""
    MATCH (b:Box) WHERE ID(b) = {box_id}
    RETURN b, ID(b) as box_id;
    """
    result = graph.run(query).data()

    if not result:
        return JsonResponse({"error": "Box not found"}, status=status.HTTP_404_NOT_FOUND)

    box = result[0]['b']
    box_id = result[0]['box_id']

    serialized_box = {
        "id": box_id,
        "name": box["name"],
        "created_by": box["created_by"],
        "created_at": box["created_at"].isoformat(),
        "updated_at": box["updated_at"].isoformat(),
    }

    return JsonResponse({"box": serialized_box})


@csrf_exempt
@api_view(['PATCH'])
def update_box(request, box_id):
    data = json.loads(request.body)
    name = data.get("name")

    query = f"""
    MATCH (b:Box) WHERE ID(b) = {box_id}
    RETURN b, ID(b) as box_id;
    """
    result = graph.run(query).data()

    if not result:
        return JsonResponse({"error": "Box not found"})

    box = result[0]['b']

    if name is not None:
        box["name"] = name

    box["updated_at"] = datetime.now()

    graph.push(box)

    serialized_box = {
        "id": box_id,
        "name": box["name"],
        "created_by": box["created_by"],
        "created_at": box["created_at"].isoformat(),
        "updated_at": box["updated_at"].isoformat(),
    }

    return JsonResponse({"box": serialized_box})
