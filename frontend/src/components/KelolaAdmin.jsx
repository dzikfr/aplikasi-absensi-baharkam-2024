import React from "react";
import { Link } from "react-router-dom";

const pegawaiData = [
  {
    id: 1,
    name: "Yukina Minato",
    jabatan: "Kaurtu Robonopsnal",
    pangkat: "Kompol",
    satuan: "Robonopsnal",
    image: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  },
  {
    id: 2,
    name: "Sayo Hikawa",
    jabatan: "Banum Robonopsnal",
    pangkat: "Bripda",
    satuan: "Robonopsnal",
    image: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  },
  {
    id: 3,
    name: "Lisa Imai",
    jabatan: "Bamin Urtu",
    pangkat: "Brigpol",
    satuan: "Robonopsnal",
    image: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  },
  {
    id: 4,
    name: "Ako Udagawa",
    jabatan: "Bamin Urtu",
    pangkat: "Bharaka",
    satuan: "Robonopsnal",
    image: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  },
  {
    id: 5,
    name: "Rinko Shirokane",
    jabatan: "TA Urtu",
    pangkat: "Juru TK I",
    satuan: "Robonopsnal",
    image: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  },
];

const KelolaAdmin = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Pangkat</th>
              <th>Jabatan</th>
              <th>Satuan</th>
              <th>Kelola</th>
            </tr>
          </thead>
          <tbody>
            {pegawaiData.map((pegawai) => (
              <tr key={pegawai.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={pegawai.image}
                          alt={`Avatar of ${pegawai.name}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{pegawai.name}</div>
                    </div>
                  </div>
                </td>
                <td>{pegawai.pangkat}</td>
                <td>{pegawai.jabatan}</td>
                <td>{pegawai.satuan}</td>
                <td>
                <button className="btn btn-outline btn-sm">Kelola</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KelolaAdmin;
