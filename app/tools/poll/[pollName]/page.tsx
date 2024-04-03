"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  RoomProvider,
  useMutation,
  useOthers,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";
import * as Form from "@radix-ui/react-form";

function Room({
  roomName,
  children,
}: {
  roomName: string;
  children: ReactNode;
}) {
  const n = localStorage.getItem("user-name");
  const [name, setName] = useState(n || "");

  const updateName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userName = String(formData.get("user-name"));
    localStorage.setItem("user-name", userName);
    setName(userName);
  };

  return (
    <div>
      {name && (
        <RoomProvider
          id={roomName}
          initialPresence={{ name }}
          initialStorage={{
            points: new LiveList(),
            pollOptions: new LiveList(),
          }}
        >
          <ClientSideSuspense fallback={<p>Loading...</p>}>
            {() => children}
          </ClientSideSuspense>
        </RoomProvider>
      )}
      {!name && (
        <Form.Root onSubmit={updateName} className="mt-[5dvh] md:mt-[15dvh]">
          <Form.Field name="user-name" className="mb-[5dvh] flex items-center">
            <Form.Label className="md:text-xl">Enter Name</Form.Label>
            <Form.Control asChild>
              <input
                className="ml-4 grow rounded-md border border-black px-2 py-1 [appearance:textfield] md:text-xl dark:border-gray-200 dark:bg-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="My Name"
                autoFocus
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild className="flex">
            <button className="mx-auto rounded-md border border-black p-2 text-xl md:p-4 md:text-2xl dark:border-gray-200">
              Submit
            </button>
          </Form.Submit>
        </Form.Root>
      )}
    </div>
  );
}

function Poll({ pollName }: { pollName: string }) {
  const options = useStorage((root) => root.pollOptions);
  const name = useSelf((me) => me.presence.name);
  const others = useOthers();

  const addPollOption = useMutation(({ storage }, name) => {
    storage
      .get("pollOptions")
      .push(
        new LiveObject({ id: window.crypto.randomUUID(), name, checkedBy: [] }),
      );
  }, []);

  const deleteOption = useMutation(({ storage }, id) => {
    const options = storage.get("pollOptions");
    const idx = options.findIndex((option) => option.toObject().id === id);
    options.delete(idx);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newOption = String(formData.get("new-option"));
    addPollOption(newOption);
  };

  const addNameToCheckedBy = useMutation(({ storage }, id) => {
    const option = storage
      .get("pollOptions")
      .find((option) => option.get("id") === id);
    option?.set("checkedBy", [...option?.get("checkedBy")!, name!]);
  }, []);

  const removeNameFromCheckedBy = useMutation(({ storage }, id) => {
    const option = storage
      .get("pollOptions")
      .find((option) => option.get("id") === id);
    option?.set(
      "checkedBy",
      option.get("checkedBy").filter((n) => n !== name),
    );
  }, []);

  const onCheckedChange = (
    checked: boolean | "indeterminate",
    optionId: string,
  ) => {
    if (checked) {
      addNameToCheckedBy(optionId);
      return;
    }
    removeNameFromCheckedBy(optionId);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold sm:grow sm:text-3xl">
          {decodeURIComponent(pollName)}
        </h1>
        <div className="flex space-x-1 truncate sm:w-1/3 sm:justify-end">
          <p className="font-semibold">Online Users:</p>
          <p className="font-light">{`${name}${
            others.length > 0
              ? ", " + others.map((o) => o.presence.name).join(", ")
              : ""
          }`}</p>
        </div>
      </div>
      <Form.Root className="flex items-center space-x-4" onSubmit={onSubmit}>
        <Form.Field name="new-option">
          <Form.Control asChild>
            <input
              className="rounded-md border border-black px-2 py-1 [appearance:textfield] dark:border-gray-200 dark:bg-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="New Option"
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button
            type="submit"
            className="h-8 w-8 rounded-full border border-black dark:border-white"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Form.Submit>
      </Form.Root>
      <table className="w-full table-fixed border-separate border-spacing-3">
        <tbody>
          {options
            ?.toSorted((a, b) => a.name.localeCompare(b.name))
            .map((option) => (
              <tr key={option.id}>
                <td>{option.name}</td>
                <td className="w-10" align="center">
                  <Checkbox.Root
                    defaultChecked={option.checkedBy.includes(name!)}
                    onCheckedChange={(checked: boolean | "indeterminate") =>
                      onCheckedChange(checked, option.id)
                    }
                    className="flex h-[25px] w-[25px] appearance-none items-center justify-center rounded border border-black p-1 outline-none dark:border-white"
                  >
                    <Checkbox.Indicator>
                      <FontAwesomeIcon icon={faCheck} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </td>
                <td className="w-1/3" align="center">
                  <div
                    className="flex items-center space-x-2"
                    title={option.checkedBy.join(", ")}
                  >
                    {option.checkedBy.length > 0 && (
                      <>
                        <p className="font-bold">
                          {`${option.checkedBy.length}:`}
                        </p>
                        <p className="truncate font-light">
                          {option.checkedBy.join(", ")}
                        </p>
                      </>
                    )}
                  </div>
                </td>
                <td className="w-6" align="center">
                  <button
                    className="rounded border border-black p-2 dark:border-white"
                    onClick={() => deleteOption(option.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page({ params }: { params: { pollName: string } }) {
  return (
    <Room roomName={params.pollName}>
      <Poll pollName={params.pollName} />
    </Room>
  );
}
