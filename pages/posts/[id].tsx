import { getAllPostsIds, getPostData } from "@/lib/post";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import homeStyles from "@/styles/Home.module.css";
import Head from "next/head";
import postStyle from "../../styles/Post.module.css";

const Post = ({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  return (
    <div className={postStyle.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingXl}>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds();
  //[{params}: {id:'pre-rendering'},{params}: {id:'ssg-ssr'}]
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);

  return {
    props: {
      postData,
    },
  };
};
