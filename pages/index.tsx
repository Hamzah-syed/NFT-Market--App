import type { GetServerSideProps, NextPage } from 'next'
import { sanityClient, urlFor } from '../lib/sanity'
import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'
import { ICollection } from '../types'
import Link from 'next/link'

export interface IProps {
  collections: ICollection[]
}

const Home: FC<IProps> = ({ collections }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT - App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <header className="flex  items-center justify-between">
        <h1 className="mb-10 text-4xl font-extralight">
          The{' '}
          <span className="font-extrabold underline decoration-pink-600/50">
            H.Dev
          </span>{' '}
          NFT Market Place
        </h1>
      </header>
      <main className="bg-slate-100 p-10 shadow-xl shadow-rose-400/20">
        <div className="grid grid-cols-3 space-x-3 md:grid-cols-2 2xl:grid-cols-4">
          {collections.map((collection) => (
            <Link key={collection._id} href={`/nft/${collection.slug.current}`}>
              <div
                className="flex cursor-pointer flex-col items-center
            transition-all duration-200 hover:scale-105
            "
              >
                <img
                  src={urlFor(collection.mainImage).url()}
                  alt="NFT"
                  className="h-96 w-60 rounded-2xl object-cover"
                />
                <div className="p-5">
                  <h2 className="text-3xl">{collection.title}</h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `
  *[_type == 'collection']{
    _id,
     title,
    description,
    mainImage{
     asset
    },
    previewImage{
      asset
    },
    slug{
      current
    },
    creator -> {
      _id,
      name,
      adderess,
      slug{
      current
      },
      image{
        asset
      }
    
  }
}

  `
  const collections = await sanityClient.fetch(query)
  return {
    props: {
      collections,
    },
  }
}
