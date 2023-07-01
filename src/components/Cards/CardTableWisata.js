import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "utils/firebase";
import { ThemeContext } from "layouts/Admin";
import { fetchDataWisata } from "helpers/FetchData.js";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "@firebase/firestore";
import { ref } from "@firebase/storage";
import { storage } from "utils/firebase";

export default function CardTableWisata({ color }) {
  const { context, setContext } = useContext(ThemeContext);

  useEffect(() => {
    fetchDataWisata().then((data) => {
      setContext({ ...context, dataWisata: data });
    });
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      // const storageRef = ref(storage, temp.foto);
      // const imageRef = storage.ref().child(temp.foto);

      // imageRef
      //   .delete()
      //   .then(() => {
      //     console.log("File berhasil dihapus");
      //   })
      //   .catch((error) => {
      //     console.error("Terjadi kesalahan saat menghapus file:", error);
      //   });

      await deleteDoc(doc(db, "wisata", id));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Berhasil Dihapus",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload(true);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    setContext({ ...context, editWisata: true, idWisata: id });
  };

  return (
    <>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <form
              className="flex flex-wrap items-center"
              //   onSubmit={(e) => addData(e)}
            >
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-blueGray-700" : "text-white")
                  }
                >
                  Wisata Indonesia
                </h3>
              </div>

              <div className="mr-1">
                <button
                  className="bg-emerald-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                  onClick={(e) => {
                    e.preventDefault();
                    setContext({ ...context, addWisata: true });
                  }}
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    No
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Nama
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Latitude
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Longitude
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Lokasi
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Deskripsi
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Harga
                  </th>

                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Tersedia
                  </th>

                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Gambar
                  </th>

                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Kategori
                  </th>

                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {context.dataWisata?.map((data, index) => {
                  let count = index + 1;
                  // console.log(data);
                  return (
                    <tr key={count} className="">
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        <span
                          className={
                            "ml-3 font-bold " +
                            +(color === "light"
                              ? "text-blueGray-600"
                              : "text-white")
                          }
                        >
                          {count}.
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.nama}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.latitude}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.longitude}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.lokasi}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.deskripsi}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(data.harga)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.ready ? "Tersedia" : "Tidak Tersedia"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <img
                          src={data.link}
                          className="w-16 h-16 object-center object-cover"
                        />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.kategori}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap text-xs p-4">
                        <div className="flex">
                          <button
                            onClick={(e) => handleDelete(e, data.id)}
                            className="mr-3 text-red"
                          >
                            Delete
                          </button>
                          <button
                            onClick={(e) => handleEdit(e, data.id)}
                            className="text-green"
                          >
                            Edit
                          </button>
                        </div>
                        {/* <TableDropdown id={data.id} /> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

CardTableWisata.defaultProps = {
  color: "light",
};

CardTableWisata.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
