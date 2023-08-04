import axios from "axios";

import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  let ekle = toast.loading("Notunu ekleyeceğim...", {
    position: "top-right",
  });
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
        dispatch(notEkle(res.data.json));
        console.log(res.data);
      }

      toast.update(ekle, {
        render: "Notunu ekledim",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  let promiseToaster = toast.loading("Notunu silicem...", {
    position: "top-left",
  });
  console.log(id);
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin
        dispatch(notSil(res.data.data));

        toast.update(promiseToaster, {
          render: "Notun silindi",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
          position: "top-left",
        });
      }
    })
    .catch((error) => console.log(error));
};
