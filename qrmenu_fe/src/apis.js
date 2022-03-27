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
          if (err.status === 400) {
            const errors = Object.keys(err.errors).map(
              (key) => err.errors[key]
            );
            toast.error(err.message);
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
      toast(err.message, { type: "error" });
    });
}
