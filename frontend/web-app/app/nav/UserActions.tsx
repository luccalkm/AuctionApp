"use client";

import { Button, Dropdown } from "flowbite-react";
import { User } from "next-auth";
import Link from "next/link";
import React from "react";
import { AiFillCar, AiFillTrophy } from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi2";

type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  return (
    <Dropdown label={`Welcome ${user.name}!`} inline>
      <Dropdown.Item icon={HiUser}>
        <Link href="/">My Auctions</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy}>
        <Link href="/">Auctions Won</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/">Sell my car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (dev only)</Link>
      </Dropdown.Item>
    </Dropdown>
  );
}
