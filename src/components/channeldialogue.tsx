import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useUser } from "@/lib/AuthContext";

const Channeldialogue = ({ isopen, onclose, channeldata, mode }: any) => {
   const { user,login } = useUser();
  // const user: any = {
  //   id: "1",
  //   name: "John Doe",
  //   email: "john@example.com",
  //   image: "https://github.com/shadcn.png?height=32&width=32",
  // };
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    description: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  useEffect(() => {
    if (channeldata && mode === "edit") {
    }
  }, [channeldata]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handlesubmit = async (e: FormEvent) => {
  e.preventDefault();
  setisSubmitting(true);
  try {
    const payload = {
      channelname: formData.name,
      description: formData.description,
    };
    const response = await axiosInstance.patch(`/user/update/${user?._id}`, payload);
    login(response?.data);
    router.push(`/channel/${user?._id}`);
    setFormData({
      name: user?.name || "",
      description: "",
    });
    onclose();
  } catch (error) {
    console.error("Error updating channel:", error);
  } finally {
    setisSubmitting(false);
  }
};

  return (
    <Dialog open={isopen} onOpenChange={onclose}>
      <DialogContent className="bg-black text-white border border-gray-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === "create" ? "Create your channel" : "Edit your channel"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Channel Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-black border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Channel Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="bg-black border-gray-600 text-white placeholder:text-gray-500"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onclose}
              className="bg-black text-white border-gray-600 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving.."
                : mode === "create"
                ? "Crate channel"
                : "Save Change"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Channeldialogue;