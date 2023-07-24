# Socket Adapters

An Adapter is a server-side component which is responsible for broadcasting events to all or a subset of clients.

When scaling to multiple Socket.IO servers, you will need to replace the default in-memory adapter by another implementation, so the events are properly routed to all clients.

![Mong ](https://socket.io/images/mongo-emitter.png)
