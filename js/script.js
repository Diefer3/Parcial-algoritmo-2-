// **CLASES**
class Cliente {
    constructor(nombre) {
    this.nombre = nombre;
    }
}

class Producto {
    constructor(nombre) {
    this.nombre = nombre; 
    }
}

class Pedido {
    constructor(cliente, producto, cantidad, prioridad) {
    this.id = Pedido.getNextId();
    this.cliente = cliente;
    this.producto = producto;
    this.cantidad = cantidad;
    this.prioridad = prioridad;
      this.procesado = [0]; // Arreglo Binario: 0 = no procesado, 1 = procesado
    }

    static getNextId() {
    if (!this.nextId) {
        this.nextId = 1;
    }
    return this.nextId++;
    }

    marcarComoProcesado() {
    this.procesado[0] = 1;
    }

    toString() {
    return `ID: ${this.id}, Cliente: ${this.cliente.nombre}, Producto: ${this.producto.nombre}, Cantidad: ${this.cantidad}, Prioridad: ${this.prioridad}, Procesado: ${this.procesado[0] === 1 ? 'Sí' : 'No'}`;
    }
}

  // **LINKEDLIST**
class Nodo {
    constructor(data) {
    this.data = data;
    this.next = null;
    }
}

class LinkedList {
    constructor() {
    this.head = null;
    this.size = 0;
    }

    add(data) {
    const newNode = new Nodo(data);
    if (!this.head) {
        this.head = newNode;
    } else {
        let current = this.head;
        while (current.next) {
        current = current.next;
        }
        current.next = newNode;
    }
    this.size++;
    }

    remove(id) {
    let current = this.head;
    let previous = null;

    while (current) {
        if (current.data.id === id) {
        if (previous) {
            previous.next = current.next;
        } else {
            this.head = current.next;
        }
        this.size--;
        return;
        }
        previous = current;
        current = current.next;
    }
    }

    find(id) {
    let current = this.head;
    while (current) {
        if (current.data.id === id) {
        return current.data;
        }
        current = current.next;
    }
    return null;
    }
}

  // **IMPLEMENTACIÓN**
const listaPedidos = new LinkedList();

  // Función para crear un nuevo pedido
function crearPedido(clienteNombre, productoNombre, cantidad, prioridad) {
    const nuevoCliente = new Cliente(clienteNombre);
    const nuevoProducto = new Producto(productoNombre);
    const nuevoPedido = new Pedido(nuevoCliente, nuevoProducto, cantidad, prioridad);
    listaPedidos.add(nuevoPedido);
    console.log("Nuevo pedido agregado:", nuevoPedido.toString());
    mostrarListaPedidos();
}

  // Función para mostrar la lista de pedidos
function mostrarListaPedidos() {
    console.log("Lista de pedidos:");
    let current = listaPedidos.head;
    while (current) {
    console.log(current.data.toString());
    current = current.next;
    }
}

  // Función para eliminar un pedido por ID
function eliminarPedido(id) {
    listaPedidos.remove(id);
    console.log("Pedido con ID", id, "eliminado.");
    mostrarListaPedidos();
}

  // **EJEMPLO DE USO (EN LA CONSOLA)**
  // Para crear un pedido: crearPedido("Juan Perez", "Laptop", 1, "alta");
  // Para mostrar la lista de pedidos: mostrarListaPedidos();
  // Para eliminar un pedido: eliminarPedido(1);