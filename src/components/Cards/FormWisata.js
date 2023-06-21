import { ThemeContext } from "layouts/Admin";
import React, { useContext, useEffect, useState } from "react";
import { db, app } from "utils/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "@firebase/firestore";

export default function FormWisata() {
  const { context, setContext } = useContext(ThemeContext);
  const allDataWisata = context.dataWisata;
  let idWisata = context.idWisata;
  console.log(context);
  const [input, setInput] = useState({
    nama: "",
    gambar: "",
    lokasi: "",
    harga: 0,
    deskripsi: "",
    ready: null,
    kategori: "",
  });

  const fillStateEdit = (idWisata) => {
    if (idWisata) {
      return setInput(getDataWisataById(idWisata));
    }
  };

  const getDataWisataById = (id) => {
    let temp = allDataWisata.find((data) => data.id == id);
    if (temp) {
      delete temp.id;
    }
    return temp;
  };

  const formOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "wisata"), input);
    setInput({
      nama: "",
      gambar: "",
      lokasi: "",
      harga: 0,
      deskripsi: "",
      ready: null,
      kategori: "",
    });
  };

  const handleSubmitEdit = async (e, collectionName, docId, newData) => {
    e.preventDefault();
    console.log(docId, "ID");
    console.log(newData, "NEW DATA");
    try {
      const docRef = await updateDoc(doc(db, collectionName, docId), newData);

      setInput({
        nama: "",
        gambar: "",
        lokasi: "",
        harga: 0,
        deskripsi: "",
        ready: null,
        kategori: "",
      });

      console.log("Data berhasil diperbarui");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fillStateEdit(idWisata);
  }, [idWisata]);

  return (
    <div className="z-50 fixed w-screen h-screen bg-transparent">
      <div className="h-full w-full">
        <div className="flex items-center justify-center h-full w-full">
          <div className="px-4" style={{ width: "45rem" }}>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 py-6 flex items-center justify-between px-4 lg:px-10">
                <div className="mb-3">
                  <h6 className="text-blueGray-500 text-xl font-bold">
                    {context.editWisata ? "Edit Wisata Indonesia" : ""}
                    {context.addWisata ? "Add Wisata Indonesia" : ""}
                  </h6>
                </div>
                <div className="mb-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setInput({
                        nama: "",
                        gambar: "",
                        lokasi: "",
                        harga: 0,
                        deskripsi: "",
                        ready: null,
                        kategori: "",
                      });
                      setContext({
                        ...context,
                        addWisata: false,
                        editWisata: false,
                      });
                      console.log(input, "BUTTON");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold"></div>
                <form
                  onSubmit={
                    context.editWisata
                      ? (e) => handleSubmitEdit(e, "wisata", idWisata, input)
                      : handleSubmitAdd
                  }
                  className="z-99"
                >
                  <div className="flex" style={{ columnGap: 12 }}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Nama Wisata
                      </label>
                      <input
                        type="text"
                        value={input.nama}
                        onChange={formOnChange}
                        name="nama"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Masukkan nama disini"
                        required={true}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Gambar
                      </label>
                      <input
                        type="text"
                        value={input.gambar}
                        onChange={formOnChange}
                        name="gambar"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Masukkan url gambar disini"
                        required={true}
                      />
                    </div>
                  </div>

                  <div className="flex" style={{ columnGap: 12 }}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Lokasi
                      </label>
                      <input
                        type="text"
                        value={input.lokasi}
                        onChange={formOnChange}
                        name="lokasi"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Masukkan lokasi disini"
                        required={true}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Harga
                      </label>
                      <input
                        type="number"
                        value={input.harga}
                        onChange={formOnChange}
                        name="harga"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Masukkan harga disini"
                        required={true}
                      />
                    </div>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Deskripsi
                    </label>
                    {/* <input
                      type="password"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    /> */}
                    <textarea
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      style={{ outline: "none" }}
                      rows={4}
                      type="text"
                      placeholder="Masukkan deskripsi disini"
                      onChange={formOnChange}
                      value={input.deskripsi}
                      name="deskripsi"
                      required={true}
                    ></textarea>
                  </div>

                  <div className="flex w-full" style={{ columnGap: 12 }}>
                    <div className="mb-3" style={{ width: "66.666%" }}>
                      <label
                        className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Kategori
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={formOnChange}
                        name="kategori"
                        required={true}
                      >
                        <option></option>
                        <option value={"Paket"}>Paket</option>
                        <option value={"Wisata"}>Wisata</option>
                        <option value={"Hotel"}>Hotel</option>
                        <option value={"Travel"}>Travel</option>
                      </select>
                      {/* <input
                      type="password"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    /> */}
                    </div>

                    <div className="mb-3" style={{ width: "33.333%" }}>
                      <label
                        className="uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Ready
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={formOnChange}
                        name="ready"
                        required={true}
                      >
                        <option></option>
                        <option value={true}>Tersedia</option>
                        <option value={false}>Tidak Tersedia</option>
                      </select>
                      {/* <input
                      type="password"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    /> */}
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      // onClick={(e) => onLogin(e)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
