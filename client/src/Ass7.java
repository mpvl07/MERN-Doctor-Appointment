import java.util.*;

class Graph {
    private int V; 
    private LinkedList<Edge>[] adjacencyList; 

   
    Graph(int V) {
        this.V = V;
        adjacencyList = new LinkedList[V];
        for (int i = 0; i < V; ++i)
            adjacencyList[i] = new LinkedList<>();
    }

    
    void addEdge(int src, int dest, int weight) {
        adjacencyList[src].add(new Edge(dest, weight));
        adjacencyList[dest].add(new Edge(src, weight));
    }

    // Inner class representing an edge
    class Edge {
        int dest;
        int weight;

        Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }

    // Distance vector routing algorithm (Bellman-Ford)
    void distanceVectorRouting(int source) {
        int[] distance = new int[V];
        Arrays.fill(distance, Integer.MAX_VALUE);
        distance[source] = 0;

        // Relax all edges |V| - 1 times
        for (int i = 0; i < V - 1; i++) {
            for (int u = 0; u < V; u++) {
                for (Edge edge : adjacencyList[u]) {
                    int v = edge.dest;
                    int weight = edge.weight;
                    if (distance[u] != Integer.MAX_VALUE && distance[u] + weight < distance[v])
                        distance[v] = distance[u] + weight;
                }
            }
        }

        // Print the distance vector
        System.out.println("Distance Vector Routing Table:");
        System.out.println("Vertex\tDistance from Source");
        for (int i = 0; i < V; i++)
            System.out.println(i + "\t\t" + distance[i]);
    }

    // Link state routing algorithm (Dijkstra's)
    void linkStateRouting(int source) {
        boolean[] visited = new boolean[V];
        int[] distance = new int[V];
        Arrays.fill(distance, Integer.MAX_VALUE);
        distance[source] = 0;

        PriorityQueue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.weight));
        pq.add(new Edge(source, 0));

        while (!pq.isEmpty()) {
            Edge current = pq.poll();
            int u = current.dest;
            visited[u] = true;

            for (Edge edge : adjacencyList[u]) {
                int v = edge.dest;
                int weight = edge.weight;
                if (!visited[v] && distance[u] != Integer.MAX_VALUE && distance[u] + weight < distance[v]) {
                    distance[v] = distance[u] + weight;
                    pq.add(new Edge(v, distance[v]));
                }
            }
        }

        // Print the distance vector
        System.out.println("\nLink State Routing Table:");
        System.out.println("Vertex\tDistance from Source");
        for (int i = 0; i < V; i++)
            System.out.println(i + "\t\t" + distance[i]);
    }
}

public class Ass7 {
    public static void main(String[] args) {
        // Create a graph
        int V = 5; // Number of vertices
        Graph graph = new Graph(V);

        // Add edges to the graph (source, destination, weight)
        graph.addEdge(0, 1, 2);
        graph.addEdge(0, 2, 4);
        graph.addEdge(1, 2, 1);
        graph.addEdge(1, 3, 7);
        graph.addEdge(2, 4, 3);
        graph.addEdge(3, 4, 1);

        int source = 0; // Source node for routing

        // Perform Distance Vector Routing
        graph.distanceVectorRouting(source);

        // Perform Link State Routing
        graph.linkStateRouting(source);
    }
}