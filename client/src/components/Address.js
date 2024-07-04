import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputReadOnly, Select } from "../components";
import {
  apiGetPublicDistricts,
  apiGetPublicProvinces,
  apiGetPublicWards,
} from "../services";

const Address = ({
  setPayload,
  invalidFields,
  setInvalidFields,
  isEdit,
  resetValue,
}) => {
  const formatWard = (stringWard) => {
    const arrWard = stringWard?.split(" ");
    arrWard?.map((item) => {
      if (+item < 10) {
        item = `0${item}`;
      }
    });

    return arrWard?.toString()?.replace(",", " ");
  };

  const { dataEdit } = useSelector((state) => state.post);

  const [reset, setReset] = useState(resetValue);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  useEffect(() => {
    if (dataEdit?.address && provinces && isEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundProvince =
        provinces?.length > 0 &&
        provinces?.find((item) =>
          item.province_name
            ?.trim()
            ?.includes(addressArr[addressArr.length - 1]?.trim())
        );
      // console.log(foundProvince);
      setProvince(foundProvince.province_id);
    } else {
      setProvince("");
    }
  }, [provinces]);

  useEffect(() => {
    if (dataEdit?.address && districts && isEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundDistrict =
        districts?.length > 0 &&
        districts?.find((item) =>
          item.district_name
            .trim()
            .includes(addressArr[addressArr.length - 2]?.trim())
        );
      setDistrict(foundDistrict.district_id);
    } else {
      setDistrict("");
    }
  }, [province, districts]);

  useEffect(() => {
    if (dataEdit?.address && wards && isEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundWard =
        wards?.length > 0 &&
        wards?.find(
          (item) =>
            item.ward_name.trim() ===
            formatWard(addressArr[addressArr.length - 3]?.trim())?.toString()
        );
      setWard(foundWard?.ward_id || "");
    } else {
      setWard("");
    }
  }, [district, wards]);
  useEffect(() => {
    const fetchPublicProvinces = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data?.results);
      }
    };
    fetchPublicProvinces();
  }, []);
  useEffect(() => {
    setDistricts(null);
    setDistrict(null);
    const fetchPublicDistricts = async () => {
      const response = await apiGetPublicDistricts(province);
      if (response.status === 200) {
        setDistricts(response?.data?.results);
      }
    };
    province && fetchPublicDistricts(province);
    !province ? setReset(true) : setReset(false);
  }, [province]);
  useEffect(() => {
    setWards(null);
    setWard(null);
    const fetchPublicDistricts = async () => {
      const response = await apiGetPublicWards(district);
      if (response.status === 200) {
        setWards(response?.data?.results);
      }
    };
    district && fetchPublicDistricts(district);
  }, [district, province]);
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        ward
          ? `${
              wards?.find((item) => item.ward_id === ward)?.ward_name ===
              undefined
                ? ""
                : `${wards?.find((item) => item.ward_id === ward)?.ward_name}, `
            }`
          : ""
      }${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name === undefined
                ? ""
                : `${
                    districts?.find((item) => item.district_id === district)
                      ?.district_name
                  }, `
            }`
          : ""
      }${
        province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
      province: province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : "",
    }));
  }, [province, district, ward]);

  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            reset={reset}
            value={province}
            label={"Tỉnh/Thành phố"}
            setValue={setProvince}
            options={provinces}
            type={"province"}
          />
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            type={"district"}
            label={"Quận/Huyện"}
            value={district}
            setValue={setDistrict}
            options={districts}
          />
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            type={"ward"}
            label={"Phường/Xã"}
            value={ward}
            setValue={setWard}
            options={wards}
          />
        </div>
        <InputReadOnly
          label={"Địa chỉ chính xác"}
          value={`${
            ward
              ? `${
                  wards?.find((item) => item.ward_id === ward)?.ward_name ===
                  undefined
                    ? ""
                    : `${
                        wards?.find((item) => item.ward_id === ward)?.ward_name
                      },`
                }`
              : ""
          }  ${
            district
              ? `${
                  districts?.find((item) => item.district_id === district)
                    ?.district_name === undefined
                    ? ""
                    : `${
                        districts?.find((item) => item.district_id === district)
                          ?.district_name
                      },`
                }`
              : ""
          } ${
            province
              ? provinces?.find((item) => item.province_id === province)
                  ?.province_name
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default memo(Address);
