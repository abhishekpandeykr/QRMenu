import { toast } from "react-toastify";

export function signIn(username, password) {
  return fetch("/auth/token/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
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
    })
    .catch((err) => {
      toast(err.message, { type: "error" });
    });
}
