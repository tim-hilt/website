"use client";

import { useState, type FormEvent, type ReactNode, useEffect } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  RoomProvider,
  useMutation,
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
  const [name, setName] = useState("");

  useEffect(() => {
    const n = localStorage.getItem("user-name");

    if (n) {
      setName(n);
    }
  }, []);

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
      {!name /* This still flashes up, even if name is in localStorage */ && (
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
      <h1 className="text-2xl font-bold sm:text-3xl">
        {decodeURIComponent(pollName)}
      </h1>
      {/** TODO: Refactor to use radix-ui Form */}
      <form className="flex items-center space-x-4" onSubmit={onSubmit}>
        <input
          // TODO: Still has white inner for some reason
          className="rounded-md border border-black px-2 py-1 [appearance:textfield] dark:border-gray-200 dark:bg-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="New Option"
          name="new-option"
        />
        <button type="submit" className="h-8 w-8 rounded-full border">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
      <table className="table-fixed border-separate border-spacing-3">
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
                    className="flex h-[25px] w-[25px] appearance-none items-center justify-center rounded border p-1 outline-none"
                  >
                    <Checkbox.Indicator>
                      <FontAwesomeIcon icon={faCheck} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </td>
                <td className="w-1/3" align="center">
                  <div className="flex items-center space-x-2">
                    {option.checkedBy.length > 0 && (
                      <>
                        <p className="font-bold">
                          {`${option.checkedBy.length}:`}
                        </p>
                        <p className="font-light">
                          {option.checkedBy
                            .map((n) => n === name && "Me")
                            .join(", ")}
                        </p>
                      </>
                    )}
                  </div>
                </td>
                <td className="w-6" align="center">
                  <button onClick={() => deleteOption(option.id)}>
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
