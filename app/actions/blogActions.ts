"use server";

import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import Tag from "@/models/Tag";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

// Blog Actions
export async function createBlog(formData: any) {
  await dbConnect();
  
  const slug = formData.slug || slugify(formData.title);
  
  const blog = await Blog.create({
    ...formData,
    slug,
  });
  
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return JSON.parse(JSON.stringify(blog));
}

export async function updateBlog(id: string, formData: any) {
  await dbConnect();
  
  if (formData.title && !formData.slug) {
    formData.slug = slugify(formData.title);
  }
  
  const blog = await Blog.findByIdAndUpdate(id, formData, { new: true });
  
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${blog.slug}`);
  return JSON.parse(JSON.stringify(blog));
}

export async function deleteBlog(id: string) {
  await dbConnect();
  const blog = await Blog.findByIdAndDelete(id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return JSON.parse(JSON.stringify(blog));
}

export async function getBlogs(filter = {}) {
  await dbConnect();
  const blogs = await Blog.find(filter)
    .populate("category")
    .populate("tags")
    .sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(blogs));
}

export async function getBlogBySlug(slug: string) {
  await dbConnect();
  const blog = await Blog.findOne({ slug, status: "published" })
    .populate("category")
    .populate("tags");
  return JSON.parse(JSON.stringify(blog));
}

// Category Actions
export async function createCategory(formData: any) {
  await dbConnect();
  const slug = formData.slug || slugify(formData.name);
  const category = await Category.create({ ...formData, slug });
  revalidatePath("/admin/categories");
  return JSON.parse(JSON.stringify(category));
}

export async function getCategories() {
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 });
  return JSON.parse(JSON.stringify(categories));
}

export async function deleteCategory(id: string) {
  await dbConnect();
  await Category.findByIdAndDelete(id);
  revalidatePath("/admin/categories");
}

// Tag Actions
export async function createTag(formData: any) {
  await dbConnect();
  const slug = formData.slug || slugify(formData.name);
  const tag = await Tag.create({ ...formData, slug });
  revalidatePath("/admin/tags");
  return JSON.parse(JSON.stringify(tag));
}

export async function getTags() {
  await dbConnect();
  const tags = await Tag.find({}).sort({ name: 1 });
  return JSON.parse(JSON.stringify(tags));
}

export async function deleteTag(id: string) {
  await dbConnect();
  await Tag.findByIdAndDelete(id);
  revalidatePath("/admin/tags");
}
