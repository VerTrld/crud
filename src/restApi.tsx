import {
  Button,
  Flex,
  Modal,
  Paper,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { InferType, object, string } from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { IconPencil, IconTrashFilled } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export default function RestApi() {
  interface IPost {
    id: string;
    name: string;
    last: string;
    email: string;
  }

  const schema = object({
    id: string().required(),
    name: string().required(),
    last: string().required(),
    email: string().required(),
  });

  type IPostType = InferType<typeof schema>;

  const form = useForm<IPostType>({
    validate: yupResolver(schema),
    initialValues: {
      id: "",
      name: "",
      last: "",
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<IPost[] | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchData = async () => {
    try {
      const res = await axios.get<IPost[]>(
        "https://66a47f8c5dc27a3c19090a4d.mockapi.io/api/users"
      );
      setApiData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
      if (editMode) {
        // Update existing record
        await axios.put(
          `https://66a47f8c5dc27a3c19090a4d.mockapi.io/api/users/${values.id}`,
          values
        );
      } else {
        // Create new record
        await axios.post(
          `https://66a47f8c5dc27a3c19090a4d.mockapi.io/api/users`,
          values
        );
      }
      form.reset();
      setEditMode(false);
      await fetchData(); // Refresh data after submission
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
      close();
    }
  });

  const deleteSubmit = async (id: string) => {
    try {
      await axios.delete(
        `https://66a47f8c5dc27a3c19090a4d.mockapi.io/api/users/${id}`
      );
      await fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (post: IPost) => {
    // Populate form with data to edit
    form.setValues(post);
    setEditMode(true);
  };

  const rows =
    apiData &&
    apiData.map((v) => (
      <Table.Tr key={v.id}>
        <Table.Td ta={"center"}>{v.id}</Table.Td>
        <Table.Td ta={"center"}> {v.name}</Table.Td>
        <Table.Td ta={"center"}>{v.last}</Table.Td>
        <Table.Td ta={"center"}> {v.email}</Table.Td>
        <Table.Td ta={"center"}>
          <Flex direction={"row"} justify={"space-evenly"}>
            <IconPencil
              onClick={() => {
                handleEdit(v);
                open();
              }}
              style={{ cursor: "pointer" }}
            />
            <IconTrashFilled
              onClick={() => deleteSubmit(v.id)}
              style={{ cursor: "pointer" }}
            />
          </Flex>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    // <Flex direction={"column"} justify={"center"} h={"100vh"} bg={"gray"}>
    //   <Flex direction={"row"} justify={"space-around"}>
    //     <Flex direction={"column"} w={"30%"}>
    //       <form onSubmit={handleSubmit}>
    //         <Flex direction={"column"} p={10} gap={10}>
    //           <TextInput
    //             label={"ID"}
    //             {...form.getInputProps("id")}
    //             disabled={editMode}
    //           />
    //           <TextInput label={"Name"} {...form.getInputProps("name")} />
    //           <TextInput label={"Age"} {...form.getInputProps("age")} />
    //           <TextInput label={"Address"} {...form.getInputProps("address")} />
    //           <Button
    //             p={5}
    //             type="submit"
    //             loading={loading}
    //             loaderProps={{ type: "oval" }}
    //           >
    //             {editMode ? "Update" : "Submit"}
    //           </Button>
    //         </Flex>
    //       </form>
    //     </Flex>
    //     <Flex direction="column" w={"50%"} h={"100%"}>
    //       {apiData &&
    //         apiData.map((v) => (
    //           <div key={v.id}>
    //             <Flex
    //               direction={"row"}
    //               gap={100}
    //               align="center"
    //               justify={"space-between"}
    //             >
    //               <Text>{v.id}</Text>
    //               <Text>{v.name}</Text>
    //               <Text>{v.age}</Text>
    //               <Text>{v.address}</Text>
    //               <Group>
    //                 <IconPencil color="yellow" onClick={() => handleEdit(v)} />
    //                 <IconTrash color="red" onClick={() => deleteSubmit(v.id)} />
    //               </Group>
    //             </Flex>
    //           </div>
    //         ))}
    //     </Flex>
    //   </Flex>
    // </Flex>

    <Flex direction={"column"} h={"100vh"} w={"100%"}>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <form onSubmit={handleSubmit}>
          <Flex direction={"column"} p={10} gap={10}>
            <TextInput
              label={"ID"}
              {...form.getInputProps("id")}
              disabled={editMode}
            />
            <TextInput label={"Name"} {...form.getInputProps("name")} />
            <TextInput label={"Last"} {...form.getInputProps("last")} />
            <TextInput label={"Email"} {...form.getInputProps("email")} />
            <Button
              p={5}
              type="submit"
              loading={loading}
              loaderProps={{ type: "oval" }}
            >
              {editMode ? "Update" : "Submit"}
            </Button>
          </Flex>
        </form>
      </Modal>

      <Flex
        direction={"row"}
        w={"100%"}
        h={"10%"}
        bg={"#304463"}
        align={"center"}
        p={30}
      >
        <Title c={"white"}>CRUD</Title>
      </Flex>
      <Flex direction={"row"} justify={"space-between"} p={20} align={"center"}>
        <Text c={"#7D8ABC"} fw={600} size={"lg"}>
          USERS
        </Text>
        <Button
          bg={"#7D8ABC"}
          onClick={() => {
            if (editMode) {
              form.reset();
              open();
            } else {
              open();
            }
          }}
        >
          Create
        </Button>
      </Flex>
      <Flex
        direction={"row"}
        justify={"center"}
        h={"100%"}
        p={"0px 20px 20px 20px"}
      >
        <Paper shadow="md" withBorder p="xl" w={"100%"} h={"100%"}>
          <Table withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th ta={"center"} c={"#304463"}>
                  ID
                </Table.Th>
                <Table.Th ta={"center"} c={"#304463"}>
                  First
                </Table.Th>
                <Table.Th ta={"center"} c={"#304463"}>
                  Last
                </Table.Th>
                <Table.Th ta={"center"} c={"#304463"}>
                  Email
                </Table.Th>
                <Table.Th ta={"center"} c={"#304463"}>
                  Action
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
      </Flex>
    </Flex>
  );
}
