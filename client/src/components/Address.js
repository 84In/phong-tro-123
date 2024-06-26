import React, { memo, useEffect, useState } from "react";
import { InputReadOnly, Select } from "../components";
import {
  apiGetPublicDistricts,
  apiGetPublicProvinces,
  apiGetPublicWards,
} from "../services";

const Address = ({ setPayload }) => {
  const [reset, setReset] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
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
                : `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
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
            reset={reset}
            value={province}
            label={"Tỉnh/Thành phố"}
            setValue={setProvince}
            options={provinces}
            type={"province"}
          />
          <Select
            type={"district"}
            label={"Quận/Huyện"}
            value={district}
            setValue={setDistrict}
            options={districts}
          />
          <Select
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
