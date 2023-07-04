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
import { fetchDataWisata } from "helpers/FetchData";
import { async } from "@firebase/util";
import { storage } from "utils/firebase";
import {
  ref,
  uploadBytesResumable,
  put,
  getMetadata,
  getDownloadURL,
  getStorage,
} from "@firebase/storage";
export default function FormWisata() {
  const { context, setContext } = useContext(ThemeContext);
  const [imageSelected, setImageSelected] = useState("");
  const allDataWisata = context.dataWisata;
  const categories = ["Wisata", "Paket", "Hotel", "Travel"];
  const ready = [true, false];
  const [dataById, setDataById] = useState({});
  const [input, setInput] = useState({
    nama: "",
    longitude: "",
    latitude: "",
    lokasi: "",
    harga: 0,
    deskripsi: "",
    ready: null,
    kategori: "",
  });
  let idWisata = context.idWisata;

  const fillStateEdit = (idWisata) => {
    if (idWisata) {
      return setInput(getDataWisataById(idWisata));
    }
  };

  const getDataWisataById = (id) => {
    let temp = allDataWisata.find((data) => data.id == id);
    if (temp) {
      delete temp.id;
      setDataById(temp);
    }
    return temp;
  };

  const onFileChange = (e) => {
    e.preventDefault();
    setImageSelected(e.target.files[0]);
  };

  const formOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    // console.log(imageSelected);
    let angka = Math.floor(Math.random() * 10000);
    const storageRef = ref(storage, `${angka}${imageSelected.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageSelected);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // console.log(snapshot);
        // Tangani perubahan status unggahan jika diperlukan
      },
      (error) => {
        // Tangani kesalahan unggahan jika terjadi
        console.error(error);
      },
      () => {
        console.log("test");
        // Unggahan berhasil selesai
        getDownloadURL(uploadTask.snapshot.ref).then((datas) => {
          getMetadata(uploadTask.snapshot.ref).then(async (data) => {
            input.ready == 0 ? (input.ready = false) : (input.ready = true);
            const newData = { ...input, foto: data.fullPath, link: datas };
            const docRef = await addDoc(collection(db, "wisata"), newData);
            // console.log(docRef);
          });
        });
      }
    );

    // // Dapatkan URL download file
    // const url = await getDownloadURL(uploadTask.snapshot.ref);
    // console.log("URL download:", url);

    // const imageRef = storage().ref().child(uri.name);
    // await imageRef.putFile(uri.uri);
    // const url = await imageRef.getDownloadURL();

    setInput({
      nama: "",
      foto: "",
      link: "",
      longitude: "",
      lokasi: "",
      latitude: "",
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
    // window.location.reload(true);
  };

  const handleSubmitEdit = async (e, collectionName, docId, newData) => {
    e.preventDefault();
    try {
      const storageRef = ref(storage, dataById.foto);
      uploadBytesResumable(storageRef, imageSelected);
      newData.ready == 0 ? (newData.ready = false) : (newData.ready = true);
      newData.foto = dataById.foto;
      newData.link = dataById.link;

      const docRef = await updateDoc(doc(db, collectionName, docId), newData);

      setInput({
        nama: "",
        foto: "",
        lokasi: "",
        link: "",
        longitude: "",
        latitude: "",
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
      window.location.reload(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const closeForm = async (e) => {
    e.preventDefault();
    setInput({
      nama: "",
      foto: "",
      link: "",
      longitude: "",
      lokasi: "",
      latitude: "",
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
  };

  useEffect(() => {
    fillStateEdit(idWisata);
  }, [idWisata]);

  return (
    <div className="z-50 fixed w-screen h-screen bg-transparent py-10">
      <div className="h-full w-full">
        <div className="flex justify-center h-full w-full">
          <div className="px-4 overflow-y-auto" style={{ width: "45rem" }}>
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
                      closeForm(e);
                      window.location.reload(true);
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
                      : (e) => handleSubmitAdd(e)
                    // window.location.reload(true);
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
                        value={input?.nama}
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
                        Foto
                      </label>
                      <input
                        type="file"
                        // value={input?.foto}
                        onChange={onFileChange}
                        // name="foto"
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
                        Latitude
                      </label>
                      <input
                        type="text"
                        value={input?.latitude}
                        onChange={formOnChange}
                        name="latitude"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Masukkan harga disini"
                        required={true}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Longitude
                      </label>
                      <input
                        type="text"
                        value={input?.longitude}
                        onChange={formOnChange}
                        name="longitude"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Masukkan lokasi disini"
                        required={true}
                      />
                    </div>
                  </div>
                  <div
                    className="text-xs pb-2 flex items-center mb-3"
                    style={{ columnGap: "10px" }}
                  >
                    <div>
                      <p>
                        Copy data latitude dan longitude dari web di samping
                        ini.
                      </p>
                    </div>
                    <div>
                      <a
                        href="https://www.latlong.net/"
                        target={"_blank"}
                        className="bg-blueGray-800 text-white rounded border-0 p-2 py-1 w-full"
                        style={{ transform: "translate(10px, 0px)" }}
                      >
                        find here
                      </a>
                    </div>
                  </div>

                  <div className="flex w-full" style={{ columnGap: 12 }}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Lokasi
                      </label>
                      <input
                        type="text"
                        value={input?.lokasi}
                        onChange={formOnChange}
                        name="lokasi"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Masukkan harga disini"
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
                        value={input?.harga}
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

                    <textarea
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      style={{ outline: "none" }}
                      rows={4}
                      type="text"
                      placeholder="Masukkan deskripsi disini"
                      onChange={formOnChange}
                      value={input?.deskripsi}
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
                        {context.editWisata ? (
                          categories.map((el, i) => {
                            if (el == input?.kategori) {
                              return (
                                <option value={el} key={i} selected>
                                  {el}
                                </option>
                              );
                            } else {
                              return (
                                <option value={el} key={i}>
                                  {el}
                                </option>
                              );
                            }
                          })
                        ) : (
                          <>
                            <option></option>
                            <option value={"Paket"}>Paket</option>
                            <option value={"Wisata"}>Wisata</option>
                            <option value={"Hotel"}>Hotel</option>
                            <option value={"Travel"}>Travel</option>
                          </>
                        )}
                      </select>
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
                        {context.editWisata ? (
                          ready.map((el, i) => {
                            if (input?.ready) {
                              if (el == input?.ready) {
                                return (
                                  <option value={1} key={i} selected>
                                    Tersedia
                                  </option>
                                );
                              } else {
                                return (
                                  <option value={0} key={i}>
                                    Tidak Tersedia
                                  </option>
                                );
                              }
                            } else {
                              if (el == input?.ready) {
                                return (
                                  <option value={0} key={i} selected>
                                    Tidak Tersedia
                                  </option>
                                );
                              } else {
                                return (
                                  <option value={1} key={i}>
                                    Tersedia
                                  </option>
                                );
                              }
                            }
                          })
                        ) : (
                          <>
                            <option></option>
                            <option value={1}>Tersedia</option>
                            <option value={0}>Tidak Tersedia</option>
                          </>
                        )}
                      </select>
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
