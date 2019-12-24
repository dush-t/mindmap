from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from nltk.corpus import wordnet as wn
import time

from . import utils
from .mindmap import MindMap

@api_view(['POST'])
def get_graph_data(request):
    main_name = str(request.data['main'])
    first_children = request.data['first_children']

    main_name_ntype = utils.get_word_type(main_name)
    children = []
    for child in first_children:
        tmp_ntype = utils.get_word_type(str(child).lower())
        ntype = ['adj' if x == 'a' else x for x in tmp_ntype]
        child_dict = {
            'name': child,
            'ntype': ntype
        }
        children.append(child_dict)

    mindmap = MindMap(main_name, main_name_ntype, children)
    graph = mindmap.generate_vis_graph()
    return Response(graph, status=200)

