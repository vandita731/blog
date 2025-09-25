import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import service from '../../appwriter/Config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            status: post?.status || "draft",
            content: post?.content || "",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userdata);

    const submit = async (data) => {
        try {
            if (!userData) throw new Error("User not logged in");

            // Upload image if selected
            const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;

            if (post) {
                // Update post
                if (file && post.featuredImage) {
                    await service.deleteFile(post.featuredImage); // delete old image
                }

                const dbpost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                    userId: userData.$id
                });

                if (dbpost) navigate(`/post/${dbpost.$id}`);

            } else {
                // Create new post
                const dbpost = await service.createPost({
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                    userId: userData.$id
                });

                if (dbpost) navigate(`/post/${dbpost.$id}`);
            }

        } catch (err) {
            console.error("Submit error:", err);
            alert(err.message); // show error in UI
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
  onSubmit={handleSubmit(submit)}
  className="flex flex-wrap bg-white shadow-lg rounded-xl p-6 gap-4"
>
  {/* Left side: Inputs */}
  <div className="w-full lg:w-2/3 px-2 space-y-4">
    <Input
      label="Title :"
      placeholder="Enter post title"
      className="mb-4"
      {...register("title", { required: true })}
    />
    <Input
      label="Slug :"
      placeholder="Post slug"
      className="mb-4"
      {...register("slug", { required: true })}
      onInput={(e) =>
        setValue(
          "slug",
          slugTransform(e.currentTarget.value),
          { shouldValidate: true }
        )
      }
    />
    <RTE
      label="Content :"
      name="content"
      control={control}
      defaultValue={getValues("content")}
    />
  </div>

  {/* Right side: Sidebar */}
  <div className="w-full lg:w-1/3 px-2 flex flex-col gap-4">
    <Input
      label="Featured Image :"
      type="file"
      className="mb-4"
      accept="image/png, image/jpg, image/jpeg, image/gif"
      {...register("image", { required: !post })}
    />

    {post?.featuredImage && (
      <div className="w-full mb-4">
        <img
          src={service.getFileUrl(post.featuredImage)}
          alt={post.title}
          className="rounded-lg w-full h-48 object-cover shadow-md"
        />
      </div>
    )}

    <Select
  options={["active", "inactive"]}
  label="Status :"
  placeholder="Select Status"
  className="mb-4"
  {...register("status", { required: true })}
/>

    <Button
      type="submit"
      bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
      textColor="text-white"
      className="w-full font-semibold shadow-md hover:shadow-lg transition duration-300"
    >
      {post ? "Update" : "Submit"}
    </Button>
  </div>
</form>

    );
}

export default PostForm;
