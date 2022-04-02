import { toast } from "react-toastify";

function request(path, { data = null, token = null, method = "GET" }) {
  const body = {
    method,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  if (method === "GET" || method === "DELETE") {
    delete body.body;
  }
  return fetch(path, body)
    .then((res) => {
      console.log(res);
      if (res.ok) {
        if (method === "DELETE") return true;
        return res.json();
      }
      return res
        .json()
        .then((err) => {
          //   handle json error here send by server
          if (res.status === 400) {
            console.log(res.status, "Status", err);
            const errors = Object.keys(err).map((key) => {
              console.log(err[key]);
              return err[key].join(",");
            });
            throw new Error(errors[0]);
          }
          throw new Error(err.message);
        })
        .catch((err) => {
          console.log(err.name);
          if (err.name === "SyntaxError") {
            console.log(err.statusText, err);
            throw new Error(err.message);
          }
          throw new Error(err.message);
        });
    })
    .then((jsonRes) => {
      //   call api successfully
      toast(JSON.stringify(jsonRes), { type: "success" });
      return jsonRes;
    })
    .catch((err) => {
      console.log("Called", err.message);
      toast(err.message, { type: "error" });
    });
}

export function signIn(username, password) {
  return request("/auth/token/login/", {
    data: { username, password },
    method: "POST",
  });
}

export function register(username, password) {
  return request("/auth/users/", {
    data: { username, password },
    method: "POST",
  });
}

export function fetchPlaces(token) {
  return request("/api/places", {
    token,
  });
}

export function addPlaces(data, token) {
  return request("/api/places", {
    data,
    token,
    method: "POST",
  });
}

export function fetchPlaceById(id, token) {
  return request(`/api/places/${id}`, { token });
}

export function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "qr_menu_photos");

  return fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_USERNAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res.json());
}

export function addCategory(data, token) {
  return request("/api/categories", { data, token, method: "POST" });
}

export function addMenuItems(data, token) {
  return request("/api/menu-items", { data, token, method: "POST" });
}
