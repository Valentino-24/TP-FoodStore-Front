export const getProductos = async () => {
  const response = await fetch("http://127.0.0.1:8000/productos/");
  const data = await response.json();
  return data;
};

export const createProducto = async (data: any) => {
  const res = await fetch("http://127.0.0.1:8000/productos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};