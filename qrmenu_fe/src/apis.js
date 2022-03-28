import { toast } from "react-toastify";

function request(path, { data = null, token = null, method = "GET" }) {
  return fetch(path, {
    method,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
    body: method !== "GET" || method !== "DELETE" ? JSON.stringify(data) : null,
  })
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
