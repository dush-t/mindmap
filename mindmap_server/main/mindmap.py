import requests
import random
import json
from urllib.parse import urlencode

url = "https://api.datamuse.com/words?"

def get_words(query_dict, type_filter=['n', 'adj', 'v']):
    query_dict['max'] = 10
    query_dict['md'] = 'p'
    query_url = url + urlencode(query_dict)
    response = requests.get(query_url).json()
    filtered_words = []
    for word_data in response:
        if any(i in word_data['tags'] for i in type_filter):
            filtered_words.append(word_data)
    return filtered_words

def get_random_or_smaller(sample_space, quantity):
    try:
        sample = random.sample(sample_space, quantity)
        return sample
    except:
        return sample_space

class Node:

    def __init__(self, name, size, ntype):
        self.id = name + str(random.randint(1, 100000))
        self.label = name
        self.size = size
        self.x = random.randint(1,10000)
        self.y = random.randint(1,10000)
        self.ntype = ntype

    def get_body(self):
        body = {
            'id': self.id,
            'label': self.label,
            'x': self.x,
            'y': self.y,
            'size': self.size
        }
        return body
        


class MindMap:
    
    def __init__(self, name, ntype, first_childs):
        self.body = {
            'nodes': [],
            'edges': []
        }

        self.main_node = Node(name, 5, ntype)
        self.body['nodes'].append(self.main_node)
        for child in first_childs:
            self.add_branch(child['name'], child['ntype'])

    def add_branch(self, branch_parent_name, branch_parent_type):
        print("Creating branch...")
        branch = MindMapBranch(branch_parent_name, branch_parent_type)
        self.body['edges'].append({
            'id': str(random.randint(1,10000000)),
            'source': self.main_node.id,
            'target': branch.parent.id
        })
        self.body['nodes'] += branch.body['nodes']
        self.body['edges'] += branch.body['edges']

    def generate_signma_graph(self):
        nodes = []
        for node in self.body['nodes']:
            nodes.append(node.get_body())
        return {
            'nodes': nodes,
            'edges': self.body['edges']
        }

    def generate_vis_graph(self):
        nodes = []
        edges = []

        for node in self.body['nodes']:
            node_dict = node.get_body()
            del node_dict['x']
            del node_dict['y']
            del node_dict['size']
            node_dict['title'] = node_dict['label']
            nodes.append(node_dict)

        for edge in self.body['edges']:
            edge_dict = {
                'from': edge['source'],
                'to': edge['target']
            }
            edges.append(edge_dict)
        
        return {
            'nodes': nodes,
            'edges': edges
        }
        



class MindMapBranch:
    

    def __init__(self, parent_name, parent_type):
        self.body = {
            'nodes': [],
            'edges': []
        }

        id = parent_name + str(random.randint(1,1000))
        node = Node(parent_name, 3, parent_type)
        self.parent = node
        self.body['nodes'].append(node)
        self.populate_node(node)


    def populate_node(self, parent_node):
        name = parent_node.label
        node_type = parent_node.ntype
        words = []
        print('Populate called')
        print('name', name)
        print('node_type', node_type)

        if 'adj' in node_type:
            spc_words = get_words({'rel_spc': name})
            syn_words = get_words({'rel_syn': name}, ['n', 'adj'])
            noun_words = get_words({'rel_jja': name}, ['n'])
            print('spc', spc_words)
            words = get_random_or_smaller(syn_words, 2) + get_random_or_smaller(spc_words, 2) + get_random_or_smaller(noun_words, 2)

        elif 'n' in node_type:
            spc_words = get_words({'rel_spc': name}, ['n', 'adj'])
            syn_words = get_words({'rel_syn': name}, ['n', 'adj'])
            adj_words = get_words({'rel_jjb': name})
            print('spc', spc_words)
            words = get_random_or_smaller(adj_words, 3) + get_random_or_smaller(syn_words, 2) + get_random_or_smaller(spc_words, 1)

        for word_data in words:
            node = Node(word_data['word'], 2, word_data['tags'])
            self.add_node(parent_node, node)
        
        print('words', words)
        print('Populate complete')


    def add_node(self, parent, node):
        self.body['nodes'].append(node)
        self.add_child_to_parent(parent, node)


    def add_child_to_parent(self, parent, child):
        self.body['edges'].append({
            'id': str(random.randint(1,100000)),
            'source': parent.id,
            'target':child.id
        })



# m = MindMap('River', ['n'], [
#     {'name': 'Calm', 'ntype': ['adj']},
#     {'name': 'Ocean', 'ntype': ['n']}
# ])


# print(m.generate_vis_graph())
