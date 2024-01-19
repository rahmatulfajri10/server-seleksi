const createTokenUser = (user) => {
    return {
      username: user.username,
      kd_role: user.kd_role,
      nopers: user.nopers,
    };
};

const createQrcodePers = (pers) => {
  return {
    nopers: pers.nopers,
    nm_pers: pers.nm_pers, 
    pangkat: pers.kd_pkt,
    korps: pers.kd_korps,
    kotama: pers.kd_ktm,
    satminkal: pers.kd_smkl,
    telp: pers.telp,
    image: pers.id_img,
    status: pers.kd_status,
    id_qrcode: pers.id_qrcode,

  }
}

const createQrcodeGuest = (tamu) => {
  return {
    nik: tamu.nik,
    nm_tamu: tamu.nm_tamu,
    telp: tamu.telp,
    id_img: tamu.id_img,
    instansi: tamu.instansi,
    ket_tamu: tamu.ket_tamu,
    id_qrcode: tamu.id_qrcode,
    pekerjaan: tamu.pekerjaan,
  }
}
  

  
module.exports = { createTokenUser, createQrcodePers, createQrcodeGuest };