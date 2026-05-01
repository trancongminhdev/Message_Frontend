"use client";
import { IMAGE_SOUCE } from "@/public/assets/images";
import { userService } from "@/service/user.service";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import InputSearch from "../input/InputSearch";
import ItemUserSearch from "../user/ItemUserSearch";
import QUERY_KEY from "@/types/constant/queryKey.constant";

const ModalSearchUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.LIST_SEARCH_USER, search],
    queryFn: () => userService.getListUser(search),
    enabled: !!search,
  });

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex-1 p-2 w-full bg-primary text-primary-foreground rounded-lg cursor-pointer hover:opacity-90 transition font-medium flex items-center justify-center gap-2"
      >
        <FiPlus className="w-5 h-5" />
        New Chat
      </button>
      <Modal
        title="Tìm kiếm người dùng mới"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center">
          {isLoading ? (
            <Image
              src={IMAGE_SOUCE.LOADING}
              alt="IMAGE_SOUCE.LOADING"
              width={30}
              height={30}
            />
          ) : data?.data?.items && data?.data?.items.length > 0 ? (
            <div className="flex flex-col gap-2 mt-2 w-full">
              {data?.data?.items?.map((user) => (
                <ItemUserSearch key={user.id} {...user} />
              ))}
            </div>
          ) : (
            <p className="w-full text-center text-sm text-muted-foreground">
              Không có người dùng
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalSearchUser;
