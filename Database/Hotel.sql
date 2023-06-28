
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=1;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=1;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema HOTEL
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `HOTEL` DEFAULT CHARACTER SET utf8 ;
USE `HOTEL` ;

-- -----------------------------------------------------
-- Table `HOTEL`.`KhachHang`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`KhachHang` (
  `MaKH` INT NOT NULL auto_increment,
  `HoTen` VARCHAR(50) NULL,
  `DiaChi` VARCHAR(50) NULL,
  `SDT` VARCHAR(11) NULL,
  `SoFAX` VARCHAR(50) NULL,
  `EMAIL` VARCHAR(50) NULL,
  PRIMARY KEY (`MaKH`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`CaNhan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`CaNhan` (
  `KhachHang_MaKH` INT NOT NULL ,
  PRIMARY KEY (`KhachHang_MaKH`),
  CONSTRAINT `fk_CaNhan_KhachHang1`
    FOREIGN KEY (`KhachHang_MaKH`)
    REFERENCES `HOTEL`.`KhachHang` (`MaKH`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`TheoDoan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`TheoDoan` (
  `MaDoan` INT NOT NULL auto_increment,
  `TenDoan` VARCHAR(50) NULL,
  `TenNguoiDangKy` VARCHAR(50) NULL,
  `SoNguoi` INT NULL,
  `KhachHang_MaKH` INT NOT NULL,
  PRIMARY KEY (`MaDoan`, `KhachHang_MaKH`),
  INDEX `fk_TheoDoan_KhachHang1_idx` (`KhachHang_MaKH` ASC) VISIBLE,
  CONSTRAINT `fk_TheoDoan_KhachHang1`
    FOREIGN KEY (`KhachHang_MaKH`)
    REFERENCES `HOTEL`.`KhachHang` (`MaKH`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`DonViLuHanh`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`DonViLuHanh` (
  `MaDV` INT NOT NULL auto_increment,
  `TenDV` VARCHAR(50) NULL,
  `DiaChi` VARCHAR(50) NULL,
  `SDT` VARCHAR(45) NULL,
  PRIMARY KEY (`MaDV`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`Tour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`Tour` (
  `MaTour` INT NOT NULL auto_increment,
  `TenTour` VARCHAR(50) NULL,
  `GiaTour` FLOAT NULL,
  `GioKhoiHanh` DATETIME NULL,
  `DonVILuHanh_MaDV` INT NOT NULL,
  `GhiChu` VARCHAR(500) NULL,
  `ChuDe` VARCHAR(50) NULL,
  `DiemThamQuan` VARCHAR(200) NULL,
  PRIMARY KEY (`MaTour`, `DonVILuHanh_MaDV`),
  INDEX `fk_Tour_DonVILuHanh1_idx` (`DonVILuHanh_MaDV` ASC) VISIBLE,
  CONSTRAINT `fk_Tour_DonVILuHanh1`
    FOREIGN KEY (`DonVILuHanh_MaDV`)
    REFERENCES `HOTEL`.`DonViLuHanh` (`MaDV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`ThamGia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`ThamGia` (
  `Tour_MaTour` INT NOT NULL auto_increment,
  `KhachHang_MaKH` INT NOT NULL,
  `PhuongTienDiChuyen` VARCHAR(50) NULL,
  `YeuCau` VARCHAR(50) NULL,
  PRIMARY KEY (`Tour_MaTour`, `KhachHang_MaKH`),
  INDEX `fk_ThamGia_KhachHang1_idx` (`KhachHang_MaKH` ASC) VISIBLE,
  CONSTRAINT `fk_ThamGia_Tour1`
    FOREIGN KEY (`Tour_MaTour`)
    REFERENCES `HOTEL`.`Tour` (`MaTour`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ThamGia_KhachHang1`
    FOREIGN KEY (`KhachHang_MaKH`)
    REFERENCES `HOTEL`.`KhachHang` (`MaKH`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`LoaiPhong`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`LoaiPhong` (
  `MaLoaiPhong` INT NOT NULL auto_increment,
  `Gia` FLOAT NULL,
  `TenLoaiPhong` VARCHAR(50) NULL,
  PRIMARY KEY (`MaLoaiPhong`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`Phong`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`Phong` (
  `MaPhong` INT NOT NULL auto_increment,
  `LoaiPhong_MaLoaiPhong` INT NOT NULL,
  PRIMARY KEY (`MaPhong`, `LoaiPhong_MaLoaiPhong`),
  INDEX `fk_Phong_LoaiPhong1_idx` (`LoaiPhong_MaLoaiPhong` ASC) VISIBLE,
  CONSTRAINT `fk_Phong_LoaiPhong1`
    FOREIGN KEY (`LoaiPhong_MaLoaiPhong`)
    REFERENCES `HOTEL`.`LoaiPhong` (`MaLoaiPhong`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`NhanVien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`NhanVien` (
  `MaNV` INT NOT NULL auto_increment,
  `TenNV` VARCHAR(50) NULL,
  `EMAIL` VARCHAR(50) NULL,
  `MatKhau` VARCHAR(500) NULL,
  `SDT` VARCHAR(45) NULL,
  PRIMARY KEY (`MaNV`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`LeTan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`LeTan` (
  `NhanVien_MaNV` INT NOT NULL auto_increment,
  PRIMARY KEY (`NhanVien_MaNV`),
  CONSTRAINT `fk_LeTan_NhanVien1`
    FOREIGN KEY (`NhanVien_MaNV`)
    REFERENCES `HOTEL`.`NhanVien` (`MaNV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`BuongPhong`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`BuongPhong` (
  `NhanVien_MaNV` INT NOT NULL auto_increment,
  PRIMARY KEY (`NhanVien_MaNV`),
  CONSTRAINT `fk_BuongPhong_NhanVien1`
    FOREIGN KEY (`NhanVien_MaNV`)
    REFERENCES `HOTEL`.`NhanVien` (`MaNV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`PhieuKiemTraPhong`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`PhieuKiemTraPhong` (
  `MaPhieuKT` INT NOT NULL auto_increment,
  `TinhTrang` VARCHAR(50) NULL,
  `BuongPhong_NhanVien_MaNV` INT NOT NULL,
  PRIMARY KEY (`MaPhieuKT`, `BuongPhong_NhanVien_MaNV`),
  INDEX `fk_PhieuKiemTraPhong_BuongPhong1_idx` (`BuongPhong_NhanVien_MaNV` ASC) VISIBLE,
  CONSTRAINT `fk_PhieuKiemTraPhong_BuongPhong1`
    FOREIGN KEY (`BuongPhong_NhanVien_MaNV`)
    REFERENCES `HOTEL`.`BuongPhong` (`NhanVien_MaNV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`PhieuDatPhong`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`PhieuDatPhong` (
  `MaPhieuDP` INT NOT NULL auto_increment,
  `GiaTong` FLOAT NULL,
  `HinhThucThanhToan` VARCHAR(50) NULL,
  `NgayThanhToan` DATE NULL,
  `PhieuKiemTraPhong_MaPhieuKT` INT NOT NULL,
  PRIMARY KEY (`MaPhieuDP`, `PhieuKiemTraPhong_MaPhieuKT`),
  INDEX `fk_PhieuDatPhong_PhieuKiemTraPhong1_idx` (`PhieuKiemTraPhong_MaPhieuKT` ASC) VISIBLE,
  CONSTRAINT `fk_PhieuDatPhong_PhieuKiemTraPhong1`
    FOREIGN KEY (`PhieuKiemTraPhong_MaPhieuKT`)
    REFERENCES `HOTEL`.`PhieuKiemTraPhong` (`MaPhieuKT`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`Dat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`Dat` (
  `KhachHang_MaKH` INT NOT NULL auto_increment,
  `KhachHang_TheoDoan_MaDoan` INT NOT NULL,
  `YeuCau` VARCHAR(50) NULL,
  `SoDemLuuTru` INT NULL,
  `NgayDen` DATE NULL,
  `XetDuyet` VARCHAR(50) NULL,
  `GopY` VARCHAR(50) NULL,
  `Phong_MaPhong` INT NOT NULL,
  `LeTan_NhanVien_MaNV` INT NOT NULL,
  `PhieuDatPhong_MaPhieuDP` INT NOT NULL,
  PRIMARY KEY (`KhachHang_MaKH`, `KhachHang_TheoDoan_MaDoan`, `Phong_MaPhong`, `LeTan_NhanVien_MaNV`, `PhieuDatPhong_MaPhieuDP`),
  INDEX `fk_Dat_Phong1_idx` (`Phong_MaPhong` ASC) VISIBLE,
  INDEX `fk_Dat_LeTan1_idx` (`LeTan_NhanVien_MaNV` ASC) VISIBLE,
  INDEX `fk_Dat_PhieuDatPhong1_idx` (`PhieuDatPhong_MaPhieuDP` ASC) VISIBLE,
  CONSTRAINT `fk_Dat_KhachHang1`
    FOREIGN KEY (`KhachHang_MaKH`)
    REFERENCES `HOTEL`.`KhachHang` (`MaKH`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Dat_Phong1`
    FOREIGN KEY (`Phong_MaPhong`)
    REFERENCES `HOTEL`.`Phong` (`MaPhong`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Dat_LeTan1`
    FOREIGN KEY (`LeTan_NhanVien_MaNV`)
    REFERENCES `HOTEL`.`LeTan` (`NhanVien_MaNV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Dat_PhieuDatPhong1`
    FOREIGN KEY (`PhieuDatPhong_MaPhieuDP`)
    REFERENCES `HOTEL`.`PhieuDatPhong` (`MaPhieuDP`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`KeToan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`KeToan` (
  `NhanVien_MaNV` INT NOT NULL auto_increment,
  PRIMARY KEY (`NhanVien_MaNV`),
  CONSTRAINT `fk_KeToan_NhanVien1`
    FOREIGN KEY (`NhanVien_MaNV`)
    REFERENCES `HOTEL`.`NhanVien` (`MaNV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`HanhLy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`HanhLy` (
  `NhanVien_MaNV` INT NOT NULL auto_increment,
  PRIMARY KEY (`NhanVien_MaNV`),
  CONSTRAINT `fk_HanhLy_NhanVien1`
    FOREIGN KEY (`NhanVien_MaNV`)
    REFERENCES `HOTEL`.`NhanVien` (`MaNV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`DichVu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`DichVu` (
  `MaDV` INT NOT NULL auto_increment,
  `TenDV` VARCHAR(50) NULL,
  `Gia` FLOAT NULL,
  `GioKetThuc` TIME NULL,
  `GioBatDau` TIME NULL,
  PRIMARY KEY (`MaDV`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`SuDung`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`SuDung` (
  `PhieuDatPhong_MaPhieuDP` INT NOT NULL auto_increment,
  `DichVu_MaDV` INT NOT NULL,
  `SoLuong` INT NULL,
  PRIMARY KEY (`PhieuDatPhong_MaPhieuDP`, `DichVu_MaDV`),
  INDEX `fk_SuDung_DichVu1_idx` (`DichVu_MaDV` ASC) VISIBLE,
  CONSTRAINT `fk_SuDung_PhieuDatPhong1`
    FOREIGN KEY (`PhieuDatPhong_MaPhieuDP`)
    REFERENCES `HOTEL`.`PhieuDatPhong` (`MaPhieuDP`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SuDung_DichVu1`
    FOREIGN KEY (`DichVu_MaDV`)
    REFERENCES `HOTEL`.`DichVu` (`MaDV`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`VatDung`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`VatDung` (
  `MaVD` INT NOT NULL auto_increment,
  `TenVD` VARCHAR(50) NULL,
  `Gia` FLOAT NULL,
  PRIMARY KEY (`MaVD`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`Thuoc_Phong_VatDung`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`Thuoc_Phong_VatDung` (
  `Phong_MaPhong` INT NOT NULL auto_increment,
  `VatDung_MaVD` INT NOT NULL,
  `SoLuong` INT NULL,
  PRIMARY KEY (`Phong_MaPhong`, `VatDung_MaVD`),
  INDEX `fk_Thuoc_Phong_VatDung_VatDung1_idx` (`VatDung_MaVD` ASC) VISIBLE,
  CONSTRAINT `fk_Thuoc_Phong_VatDung_Phong1`
    FOREIGN KEY (`Phong_MaPhong`)
    REFERENCES `HOTEL`.`Phong` (`MaPhong`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Thuoc_Phong_VatDung_VatDung1`
    FOREIGN KEY (`VatDung_MaVD`)
    REFERENCES `HOTEL`.`VatDung` (`MaVD`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HOTEL`.`SuDung_PKTP_VatDung`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HOTEL`.`SuDung_PKTP_VatDung` (
  `PhieuKiemTraPhong_MaPhieuKT` INT NOT NULL auto_increment,
  `VatDung_MaVD` INT NOT NULL,
  `SoLuong` INT NULL,
  PRIMARY KEY (`PhieuKiemTraPhong_MaPhieuKT`, `VatDung_MaVD`),
  INDEX `fk_SuDung_PKTP_VatDung_VatDung1_idx` (`VatDung_MaVD` ASC) VISIBLE,
  CONSTRAINT `fk_SuDung_PKTP_VatDung_PhieuKiemTraPhong1`
    FOREIGN KEY (`PhieuKiemTraPhong_MaPhieuKT`)
    REFERENCES `HOTEL`.`PhieuKiemTraPhong` (`MaPhieuKT`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SuDung_PKTP_VatDung_VatDung1`
    FOREIGN KEY (`VatDung_MaVD`)
    REFERENCES `HOTEL`.`VatDung` (`MaVD`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `HOTEL`.`QuiDinh`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `HOTEL`.`QuiDinh` (
  `MaQD` INT NOT NULL auto_increment,
  `NoiDung` VARCHAR(100) NULL,

  PRIMARY KEY (`MaQD`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- ----------------------------------------------
-- INSERT
-- ----------------------------------------- KHACH HANG ---------------------------------------------------------

INSERT INTO khachhang ( MaKH,HoTen,DiaChi,SDT,SoFAX,EMAIL)
VALUES
  (1,"Charde Sweet","1997 Auctor Street","0345582808","065-152-6186","eget@google.org"),
  (2,"Montana Mcleod","Ap #366-734 Purus. Rd.","0434148193","041-913-8477","tempor@outlook.edu"),
  (3,"Brittany Bowman","Ap #576-8611 Ultricies Av.","0324528800","060-644-6205","quisque@icloud.net"),
  (4,"Amal Dennis","Ap #991-1365 Egestas, Av.","0614548792","097-538-0367","ullamcorper.eu.euismod@icloud.net"),
  (5,"Sheila Gillespie","845-7959 Arcu. Av.","0341026167","054-436-6757","mauris@icloud.couk"),
  (6,"Summer Moran","Ap #784-5760 Ipsum Av.","0613385333","090-480-5371","proin@aol.ca"),
  (7,"Jolene Riley","P.O. Box 570, 9304 Dictum Road","0327616583","077-754-3897","in.dolor.fusce@hotmail.couk"),
  (8,"Pamela Bridges","Ap #741-7591 Cum Street","0827288506","094-342-6977","pellentesque.habitant@protonmail.org"),
  (9,"Yen Nash","675-5496 Aenean Avenue","0943748253","005-582-5743","ipsum.suspendisse.sagittis@outlook.ca"),
  (10,"Abra Berry","Ap #334-6935 Tincidunt Rd.","0646941186","074-414-2084","penatibus@hotmail.edu");
INSERT INTO khachhang ( MaKH,HoTen,DiaChi,SDT,SoFAX,EMAIL)
VALUES
  (11,"Nina Gallagher","Ap #438-4889 Proin Ave","0735754423","096-847-3854","nam.porttitor.scelerisque@icloud.com"),
  (12,"Diana Vang","P.O. Box 578, 2454 Vel Rd.","0525032771","065-782-2123","lacus.vestibulum@aol.net"),
  (13,"Jamalia Carroll","967-6550 Malesuada Rd.","0367336389","085-824-8537","lorem@hotmail.couk"),
  (14,"Willow Anderson","Ap #895-2764 Malesuada. St.","0843024227","008-064-5585","phasellus.vitae.mauris@icloud.edu"),
  (15,"Inga Dawson","697-1671 Pharetra. Ave","0111602122","046-904-7653","posuere@hotmail.ca"),
  (16,"Zane Cooper","Ap #385-8411 Nisl St.","0471485282","097-381-7347","vulputate.posuere@outlook.net"),
  (17,"Frances Randall","P.O. Box 854, 1545 Facilisis St.","0138037389","081-828-2037","sollicitudin.a@google.net"),
  (18,"Clark Beasley","8145 Iaculis Street","0228378869","028-281-2682","at.risus@hotmail.couk"),
  (19,"Lester Franklin","191-7521 Vel, Road","0746268283","051-375-7224","facilisis.eget@outlook.edu"),
  (20,"Hedley Evans","6722 Semper. Rd.","0278758643","007-340-5210","mauris.integer.sem@hotmail.edu");

select * from KHACHHANG;
-- ----------------------------------------- THEO DOAN ---------------------------------------------------------


INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,1);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,2);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,3);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,4);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,5);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,6);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,7);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,8);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,9);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 1,'ABC','Charde Sweet',10,10);

INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 2,'FAclub','Nina Gallagher',10,11);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 2,'FAclub','Nina Gallagher',10,12);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 2,'FAclub','Nina Gallagher',10,13);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 2,'FAclub','Nina Gallagher',10,14);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 2,'FAclub','Nina Gallagher',10,15);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 2,'FAclub','Nina Gallagher',10,16);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 2,'FAclub','Nina Gallagher',10,17);
INSERT theodoan ( MaDoan,TenDoan,TenNguoiDangKy,SoNguoi,KhachHang_MaKH) VALUES ( 2,'FAclub','Nina Gallagher',10,18);

select * from theodoan;

-- ----------------------------------------- CA NHAN ---------------------------------------------------------

INSERT canhan ( KhachHang_MaKH) VALUES ( 19);
INSERT canhan ( KhachHang_MaKH) VALUES ( 20 );

select * from canhan;

-- ----------------------------------------- DONVILUHANH ---------------------------------------------------------

INSERT INTO donviluhanh (MaDV,TenDV,DiaChi,SDT)
VALUES
  (1,"Accumsan Convallis Ltd","950-9970 In St.","0538966869"),
  (2,"Sem Egestas Company","280-6955 Nisl Avenue","0456691854");

select * from donviluhanh;

-- ----------------------------------------- TOUR ---------------------------------------------------------

INSERT INTO tour (MaTour,TenTour,GiaTour,GioKhoiHanh,DonVILuHanh_MaDV,GhiChu,ChuDe,DiemThamQuan)
VALUES
  (1,N'Hồ Chí Minh - Mỹ Tho - Cần Thơ - Miền Tây 2N1Đ',1850000,"2022-12-25 20:00:00",1,N'Tham quan khu du lịch Cồn Phụng, Trải nghiệm đi chợ nổi Cái Răng, Thử sức làm đặc sản kẹo dừa Bến Tre ',N'Văn Hóa',N'Cù Lao Thời Sơn, Cồn Phụng, Chợ nổi Cái Răng'),
  (2,N'Khám Phá sông nước miền Tây: Cần Thơ - Cà Mau 4N3Đ',7590000,"2022-11-2 20:00:00",2,N'Tặng 20kg hành lý ký gửi bay Bamboo Airways, Thưởng thức bữa tối trên du thuyền Cần Thơ, Check in mũi Cà Mau nhà Công Tử Bạc Liêu, Tham quan Rừng Tràm Trà Sư ',N'Khám Phá',N'Chùa Dơi,Nhà công tử Bạc Liêu, Đất  Mũi, Rừng Tràm Trà Sư, Miếu  Bà Chúa Xứ Núi Sam, Chợ Nổi Cái Răng');
  
  select * from Tour;

-- ----------------------------------------- THAMGIA ---------------------------------------------------------

INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,1,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,2,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,3,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,4,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,5,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,6,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,7,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,8,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,9,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,10,'Train','');

INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 2,11,'Plane','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 2,12,'Plane','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 2,13,'Plane','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 2,14,'Plane','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 2,15,'Plane','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 2,16,'Plane','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 2,17,'Plane','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 2,18,'Plane','');

INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 1,19,'Train','');
INSERT thamgia ( Tour_MaTour,KhachHang_MaKH,PhuongTienDiChuyen,YeuCau ) VALUES ( 2,20,'Plane','');


 select * from thamgia;
 
 -- ----------------------------------------- NHANVIEN ---------------------------------------------------------

INSERT INTO nhanvien (MaNV,TenNV,EMAIL,SDT,MatKhau)
VALUES
  (1,"Gregory Navarro","malesuada@outlook.org","0477289040","123"),
  (2,"Garrett Rice","dictum.ultricies.ligula@icloud.ca","0658478253","123"),
  (3,"Cameron Webb","purus@yahoo.edu","0103588236","123"),
  (4,"Lewis Sanders","erat.volutpat.nulla@yahoo.couk","0911280620","123"),
  (5,"Edan Davenport","consequat.lectus.sit@icloud.com","0922761073","123"),
  (6,"Gabriel Gentry","convallis.ante@outlook.couk","0585226281","123"),
  (7,"Dillon Hancock","mi.lacinia@yahoo.edu","0942430425","123"),
  (8,"Christian Lowe","sed.nunc.est@icloud.com","0487436488","123"),
  (9,"Henry Lowery","sed.leo@hotmail.com","0448817729","123"),
  (10,"Sebastian Parker","at.sem@icloud.com","0061504981","123");
INSERT INTO nhanvien (MaNV,TenNV,EMAIL,SDT,MatKhau)
VALUES
  (11,"Elvis Ayers","tellus.imperdiet@aol.ca","0655234238","123"),
  (12,"Zane Donovan","ultricies.adipiscing@protonmail.org","0471426782","123"),
  (13,"Thomas Kennedy","cubilia@protonmail.ca","0106842112","123"),
  (14,"Alfreda Jordan","risus.at@yahoo.net","0368916612","123"),
  (15,"Colton Guerra","feugiat@yahoo.ca","0447487852","123"),
  (16,"Hedy Byrd","nunc.nulla@aol.com","0798765936","123"),
  (17,"Len Velazquez","semper@protonmail.com","0184526683","123"),
  (18,"Bevis Knapp","imperdiet.ullamcorper@outlook.org","0535174744","123"),
  (19,"Dora Wilder","nibh@yahoo.ca","0661960706","123"),
  (20,"Laura Russo","quam.a@outlook.edu","0085696086","123"),
 (21,"Benzema","benzema@outlook.edu","0085696086","$2a$10$HAnrlbKuGjr2dWQKZ1NZ8eO4NwX.GhOC28yqGHa3JikussSRSBHnG");

select * from nhanvien;

 -- ----------------------------------------- LETAN ---------------------------------------------------------

INSERT letan ( NhanVien_MaNV ) VALUES ( 1 );
INSERT letan ( NhanVien_MaNV ) VALUES ( 2 );
INSERT letan ( NhanVien_MaNV ) VALUES ( 3 );
INSERT letan ( NhanVien_MaNV ) VALUES ( 4 );

select * from letan;

 -- ----------------------------------------- BUONGPHONG---------------------------------------------------------

INSERT buongphong ( NhanVien_MaNV ) VALUES ( 5 );
INSERT buongphong ( NhanVien_MaNV ) VALUES ( 6 );
INSERT buongphong ( NhanVien_MaNV ) VALUES ( 7 );
INSERT buongphong ( NhanVien_MaNV ) VALUES ( 8 );

select * from buongphong;

 -- ----------------------------------------- HANHLY---------------------------------------------------------

INSERT hanhly ( NhanVien_MaNV ) VALUES ( 9 );
INSERT hanhly ( NhanVien_MaNV ) VALUES ( 10 );
INSERT hanhly ( NhanVien_MaNV ) VALUES ( 11 );
INSERT hanhly ( NhanVien_MaNV ) VALUES ( 12 );
INSERT hanhly ( NhanVien_MaNV ) VALUES ( 13 );
INSERT hanhly ( NhanVien_MaNV ) VALUES ( 14 );

select * from hanhly;

 -- ----------------------------------------- KETOAN---------------------------------------------------------

INSERT ketoan ( NhanVien_MaNV ) VALUES ( 15 );
INSERT ketoan ( NhanVien_MaNV ) VALUES ( 16 );
INSERT ketoan ( NhanVien_MaNV ) VALUES ( 17 );
INSERT ketoan ( NhanVien_MaNV ) VALUES ( 18 );
INSERT ketoan ( NhanVien_MaNV ) VALUES ( 19 );
INSERT ketoan ( NhanVien_MaNV ) VALUES ( 20 );

select * from ketoan;


 -- ----------------------------------------- LOAIPHONG---------------------------------------------------------

INSERT loaiphong ( MaLoaiPhong,Gia,TenLoaiPhong ) VALUES ( 1,300000,"Loai A" );
INSERT loaiphong ( MaLoaiPhong,Gia,TenLoaiPhong ) VALUES ( 2,400000,"Loai B" );
INSERT loaiphong ( MaLoaiPhong,Gia,TenLoaiPhong ) VALUES ( 3,500000,"Loai C" );

select * from loaiphong ;

 -- ----------------------------------------- PHONG---------------------------------------------------------

INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,100);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,101);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,102);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,103);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,104);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,105);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,106);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,107);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,108);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,109);

INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 2,200);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 2,201);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 2,202);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 2,203);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 2,204);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 2,205);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 2,206);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 2,207);

INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 1,110);
INSERT phong ( LoaiPhong_MaLoaiPhong,MaPhong ) VALUES ( 2,208);

select * from phong ;

 -- ----------------------------------------- VATDUNG---------------------------------------------------------

INSERT vatdung ( MaVD,TenVD , Gia ) VALUES ( 1,'Toothbrush',90000);
INSERT vatdung ( MaVD,TenVD , Gia ) VALUES ( 2,'Spring water ',10000);
INSERT vatdung ( MaVD,TenVD , Gia ) VALUES ( 3,'Carbonated drink',20000);
INSERT vatdung ( MaVD,TenVD , Gia ) VALUES ( 4,'Snacks',12000);
INSERT vatdung ( MaVD,TenVD , Gia ) VALUES ( 5,'Champagne',100000);
INSERT vatdung ( MaVD,TenVD , Gia ) VALUES ( 6,'Fruit juices',40000);
INSERT vatdung ( MaVD,TenVD , Gia ) VALUES ( 7,'Note',5000);

select * from vatdung ;

 -- ----------------------------------------- THUOC_PHONG_VATDUNG---------------------------------------------------------

INSERT thuoc_phong_vatdung ( Phong_MaPhong, Vatdung_MaVD,Soluong ) VALUES ( 100,1,1);
INSERT thuoc_phong_vatdung ( Phong_MaPhong, Vatdung_MaVD,Soluong ) VALUES ( 100,2,1);
INSERT thuoc_phong_vatdung ( Phong_MaPhong, Vatdung_MaVD,Soluong ) VALUES ( 100,3,1);
INSERT thuoc_phong_vatdung ( Phong_MaPhong, Vatdung_MaVD,Soluong ) VALUES ( 100,4,3);
INSERT thuoc_phong_vatdung ( Phong_MaPhong, Vatdung_MaVD,Soluong ) VALUES ( 100,5,0);
INSERT thuoc_phong_vatdung ( Phong_MaPhong, Vatdung_MaVD,Soluong ) VALUES ( 100,6,1);
INSERT thuoc_phong_vatdung ( Phong_MaPhong, Vatdung_MaVD,Soluong ) VALUES ( 100,7,1);

select * from thuoc_phong_vatdung;

 -- ----------------------------------------- PHIEUKIEMTRAPHONG---------------------------------------------------------

INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 1,'',5);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 2,'',5);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 3,'',5);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 4,'',5);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 5,'',5);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 6,'',5);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 7,'',5);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 8,'',6);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 9,'', 6);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 10,'',6);

INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 11,'',6);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 12,'',6);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 13,'',6);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 14,'',7);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 15,'',7);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 16,'',7);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 17,'',8);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 18,'',8);

INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 19,'',8);
INSERT phieukiemtraphong ( MaPhieuKT,TinhTrang,BuongPhong_NhanVien_MaNV ) VALUES ( 20,'',8);

select * from phieukiemtraphong;

 -- ----------------------------------------- SUDUNG_PKTP_VATDUNG---------------------------------------------------------

INSERT SUDUNG_PKTP_VATDUNG ( PhieuKiemTraPhong_MaPhieuKT,VatDung_MaVD,SoLuong ) VALUES ( 1,1,1);
INSERT SUDUNG_PKTP_VATDUNG ( PhieuKiemTraPhong_MaPhieuKT,VatDung_MaVD,SoLuong ) VALUES ( 1,2,1);
INSERT SUDUNG_PKTP_VATDUNG ( PhieuKiemTraPhong_MaPhieuKT,VatDung_MaVD,SoLuong ) VALUES ( 1,3,1);
INSERT SUDUNG_PKTP_VATDUNG ( PhieuKiemTraPhong_MaPhieuKT,VatDung_MaVD,SoLuong ) VALUES ( 1,4,3);
INSERT SUDUNG_PKTP_VATDUNG ( PhieuKiemTraPhong_MaPhieuKT,VatDung_MaVD,SoLuong ) VALUES ( 1,5,0);
INSERT SUDUNG_PKTP_VATDUNG ( PhieuKiemTraPhong_MaPhieuKT,VatDung_MaVD,SoLuong ) VALUES ( 1,6,1);
INSERT SUDUNG_PKTP_VATDUNG ( PhieuKiemTraPhong_MaPhieuKT,VatDung_MaVD,SoLuong ) VALUES ( 1,7,1);

select * from SUDUNG_PKTP_VATDUNG;

 -- ----------------------------------------- PHIEUDATPHONG---------------------------------------------------------

INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 1,1000000,"TienMat",'2023-09-12',1);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 2,1000000,"TienMat",'2023-10-12',2);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 3,1000000,"TienMat",'2023-09-29',3);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 4,1000000,"TienMat",'2023-10-12',4);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 5,1000000,"TienMat",'2023-05-12',5);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 6,1000000,"TienMat",'2023-09-12',6);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 7,1000000,"TienMat",'2023-06-15',7);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 8,1000000,"TienMat",'2023-09-26',8);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 9,1000000,"TienMat",'2023-01-12',9);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 10,1000000,"TienMat",'2023-02-24',10);


INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 11,2000000,"BangThe",'2023-10-12',11);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 12,2000000,"BangThe",'2023-07-15',12);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 13,2000000,"BangThe",'2023-09-04',13);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 14,2000000,"BangThe",'2023-03-12',14);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 15,2000000,"BangThe",'2023-03-17',15);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 16,2000000,"BangThe",'2023-09-27',16);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 17,2000000,"BangThe",'2023-12-12',17);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 18,2000000,"BangThe",'2023-11-11',18);

INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 19,1000000,"BangThe",'2023-09-12',19);
INSERT phieudatphong ( MaPhieuDP,GiaTong,HinhThucThanhToan,NgayThanhToan,PhieuKiemTraPhong_MaPhieuKT ) VALUES ( 20,2000000,"BangThe",'2023-09-12',20);

select * from phieudatphong;

 -- ----------------------------------------- DICHVU---------------------------------------------------------

INSERT dichvu ( MaDV,TenDV,Gia,GioBatDau,GioKetThuc ) VALUES ( 1,"Beer",12000,"18:00:00","22:00:00");
INSERT dichvu ( MaDV,TenDV,Gia,GioBatDau,GioKetThuc ) VALUES ( 2,"Gym",200000,"9:00:00","18:00:00");
INSERT dichvu ( MaDV,TenDV,Gia,GioBatDau,GioKetThuc ) VALUES ( 3,"Karaoke",60000,"9:00:00","22:00:00");
INSERT dichvu ( MaDV,TenDV,Gia,GioBatDau,GioKetThuc ) VALUES ( 4,"Swimming pool",120000,"6:30:00","22:00:00");

select * from dichvu;

 -- ----------------------------------------- SUDUNG---------------------------------------------------------

INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (1,1,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (2,1,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (3,1,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (4,1,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (5,2,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (6,2,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (7,2,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (8,2,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (9,2,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (10,3,1 );

INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (11,3,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (12,3,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (13,3,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (14,3,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (15,3,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (16,4,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (17,4,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (18,4,1 );

INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (19,4,1 );
INSERT sudung ( PhieuDatPhong_MaPhieuDP,DichVu_MaDV,SoLuong ) VALUES (20,4,1 );

select * from sudung;

 -- ----------------------------------------- DAT---------------------------------------------------------

INSERT INTO dat ( KhachHang_MaKH,KhachHang_TheoDoan_MaDoan,YeuCau,SoDemLuuTru,NgayDen,XetDuyet,GopY,Phong_MaPhong,LeTan_NhanVien_MaNV,PhieuDatPhong_MaPhieuDP ) 
VALUES
  (1,1,"",3,'2023-12-12',"Duyet","","100",1,1),
  (2,1,"",3,'2023-12-12',"Duyet","","101",1,2),
  (3,1,"",3,'2023-12-12',"Duyet","","102",1,3),
  (4,1,"",3,'2023-12-12',"Duyet","","103",1,4),
  (5,1,"",3,'2023-12-12',"Duyet","","104",1,5),
  (6,1,"",3,'2023-12-12',"Duyet","","105",2,6),
  (7,1,"",3,'2023-12-12',"Duyet","","106",2,7),
  (8,1,"",3,'2023-12-12',"Duyet","","107",2,8),
  (9,1,"",3,'2023-12-12',"Duyet","","108",2,9),
  (10,1,"",3,'2023-12-12',"Duyet","","109",2,10);
INSERT INTO dat ( KhachHang_MaKH,KhachHang_TheoDoan_MaDoan,YeuCau,SoDemLuuTru,NgayDen,XetDuyet,GopY,Phong_MaPhong,LeTan_NhanVien_MaNV,PhieuDatPhong_MaPhieuDP ) 
VALUES
  (11,2,"",2,'2023-12-15',"Duyet","","200",2,11),
  (12,2,"",2,'2023-12-15',"Duyet","","201",2,12),
  (13,2,"",2,'2023-12-15',"Duyet","","202",3,13),
  (14,2,"",2,'2023-12-15',"Duyet","","203",3,14),
  (15,2,"",2,'2023-12-15',"Duyet","","204",3,15),
  (16,2,"",2,'2023-12-15',"Duyet","","205",3,16),
  (17,2,"",2,'2023-12-15',"Duyet","","206",3,17),
  (18,2,"",2,'2023-12-15',"Duyet","","207",3,18),
  (19,0,"",5,'2023-10-15',"Duyet","","110",4,19),
  (20,0,"",6,'2023-10-15',"Duyet","","208",4,20);
 
 select * from dat;

 -- ----------------------------------------- QUiDINH---------------------------------------------------------

INSERT quidinh ( MaQD,NoiDung ) VALUES (1,"1. Khong lam mat vat dung" );
INSERT quidinh ( MaQD,NoiDung ) VALUES (2,"2. Khong lam on anh huong den nguoi khac" );
INSERT quidinh ( MaQD,NoiDung ) VALUES (3,"3. Khong di chuyen vat dung tu phong nay sang phong khac" );

select * from quidinh;