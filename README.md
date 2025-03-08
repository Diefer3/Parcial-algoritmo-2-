# Gestor de Pedidos en Consola (JavaScript)

## Descripción

Este proyecto implementa un sistema de gestión de pedidos simple pero funcional que se ejecuta completamente en la consola del navegador. Utiliza JavaScript, clases para modelar los datos y una lista enlazada para almacenar los pedidos.

## Características

*   **Creación de Pedidos:** Permite crear nuevos pedidos especificando el cliente, producto, cantidad y prioridad.
*   **Visualización de Pedidos:** Muestra una lista de todos los pedidos almacenados.
*   **Eliminación de Pedidos:** Permite eliminar pedidos individuales por su ID.
*   **Búsqueda de Pedidos:** Permite buscar pedidos por el nombre del cliente.
*   **Arreglos Binarios:** Utiliza arreglos binarios para representar el estado "procesado" de un pedido.
*   **Lista Enlazada:** Implementa una lista enlazada para almacenar los pedidos de forma dinámica.
*   **Interacción por Consola:** La interacción con el sistema se realiza completamente a través de la consola del navegador.

## Estructura del Proyecto

*   `index.html`: Contiene la estructura HTML básica (solo la etiqueta `<script>` para incluir el código JavaScript).
*   `js/script.js`: Contiene todo el código JavaScript del proyecto, incluyendo las clases, la lista enlazada y las funciones para gestionar los pedidos.

## Cómo Utilizar

1.  Abre el archivo `index.html` en tu navegador.
2.  Abre la consola del navegador (presiona F12).
3.  Utiliza las siguientes funciones en la consola para gestionar los pedidos:

    *   `crearPedido(clienteNombre, productoNombre, cantidad, prioridad)`: Crea un nuevo pedido.
        *   Ejemplo: `crearPedido("Juan Perez", "Laptop", 1, "alta");`
    *   `mostrarListaPedidos()`: Muestra la lista de pedidos.
        *   Ejemplo: `mostrarListaPedidos();`
    *   `eliminarPedido(id)`: Elimina un pedido por su ID.
        *   Ejemplo: `eliminarPedido(1);`
    *   `buscarPedidosPorCliente(clienteNombre)`: Busca pedidos por nombre de cliente.
        *   Ejemplo: `buscarPedidosPorCliente("Juan Perez");`

## Ejemplo de Uso

```javascript
// Crear algunos pedidos
crearPedido("Juan Perez", "Laptop", 1, "alta");
crearPedido("Maria Gomez", "Tablet", 2, "media");
crearPedido("Juan Perez", "Monitor", 1, "baja");

// Mostrar la lista de pedidos
mostrarListaPedidos();

// Buscar pedidos para Juan Perez
buscarPedidosPorCliente("Juan Perez");

// Eliminar el pedido con ID 2
eliminarPedido(2);

// Mostrar la lista de pedidos actualizada
mostrarListaPedidos();

Código Fuente
El código fuente del proyecto se encuentra en el archivo js/script.js. Puedes encontrar una explicación detallada del código a continuación:
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

// Función para buscar pedidos por cliente
function buscarPedidosPorCliente(clienteNombre) {
  console.log(`Buscando pedidos para el cliente: ${clienteNombre}`);
  let current = listaPedidos.head;
  let encontrados = [];
  while (current) {
    if (current.data.cliente.nombre.toLowerCase() === clienteNombre.toLowerCase()) {
      encontrados.push(current.data);
    }
    current = current.next;
  }
  if (encontrados.length > 0) {
    encontrados.forEach(pedido => console.log(pedido.toString()));
  } else {
    console.log(`No se encontraron pedidos para el cliente ${clienteNombre}`);
  }
}


