import {
  Box,
  Button,
  Flex,
  Input,
  Notification,
  Text,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { IconPencil, IconPlus, IconTrashFilled } from "@tabler/icons-react";
import { useState } from "react";
import { InferType, object, string } from "yup";
import { Notifications } from "@mantine/notifications";

export default function TodoList() {
  // Specify the type of listValue as string[]
  const [listValue, setListValue] = useState<string[]>([]);

  const schema = object({
    input: string().required(),
  });

  type IInput = InferType<typeof schema>;

  const form = useForm<IInput>({
    validate: yupResolver(schema),
    initialValues: {
      input: "",
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    setListValue([...listValue, values.input]);
    form.reset();
  });
  console.log("e", form);

  return (
    <>
      <Flex
        direction={"column"}
        justify={"center"}
        h={"100vh"}
        w={"100%"}
        bg={"#758694"}
      >
        <Flex direction={"row"} justify={"center"} mih={"50%"} w={"100%"}>
          <Flex direction={"column"} w={"30%"} bg={"white"} align={"center"}>
            <Title>Todo List</Title>

            <form onSubmit={handleSubmit}>
              <Flex
                direction={"row"}
                justify={"center"}
                align={"center"}
                w={"100%"}
                p={10}
                bg={"red"}
              >
                <Input
                  placeholder="Add your new todo"
                  flex={1}
                  {...form.getInputProps("input")}
                />
                <Box bg={"blue"} p={2} ml={10} style={{ borderRadius: "5px" }}>
                  <Button type="submit">
                    <IconPlus color="white" type="submit" />
                  </Button>
                </Box>
              </Flex>
            </form>
            <Flex direction={"column"} w={"62%"}>
              {listValue.map((v, index) => (
                <>
                  <Flex
                    direction={"row"}
                    justify={"space-between"}
                    bg={"blue"}
                    w={"100%"}
                    p={10}
                  >
                    <Text>{v}</Text>
                    <Flex>
                      <IconPencil />
                      <IconTrashFilled
                        onClick={() => {
                          setListValue((prev) =>
                            prev.filter((_, i) => i != index)
                          );
                        }}
                      />
                    </Flex>
                    <Notifications />
                  </Flex>
                </>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction={"row"} justify={"end"} p={30} bg={"red"}>
          <Box
            w={150}
            h={100}
            bg={"white"}
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
          >
            <Text>hello</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
