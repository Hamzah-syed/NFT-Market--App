import React, { FC } from 'react'
// Thirdweb
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { sanityClient, urlFor } from '../../lib/sanity'
import { GetServerSideProps } from 'next'
import { ICollection } from '../../types'
import Link from 'next/link'

interface IProps {
  collection: ICollection
}

const NFTDropPage: FC<IProps> = ({ collection }) => {
  //Auth
  const connectWithMetaMask = useMetamask()
  const adderess = useAddress()
  const disconnect = useDisconnect()
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="col-span-4 flex bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex w-full flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            <img
              src={urlFor(collection.mainImage).url()}
              alt="Apes"
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">
              {collection.title}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex h-full flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex  items-center justify-between">
          <Link href={'/'}>
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              The{' '}
              <span className="font-extrabold underline decoration-pink-600/50">
                H.Dev
              </span>{' '}
              NFT Market Place
            </h1>
          </Link>
          <button
            className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold 
          text-white lg:px-5 lg:py-3 lg:text-base"
            onClick={() => {
              adderess ? disconnect() : connectWithMetaMask()
            }}
          >
            {adderess ? 'Sign Out' : 'Sign In'}
          </button>
        </header>

        <hr className="my-2 border" />
        {adderess && (
          <p className="text-center text-sm text-rose-500">
            You're Logged in with the wallet {adderess.substring(0, 5)}...
            {adderess.substring(adderess.length - 5)}
          </p>
        )}
        {/* Content */}
        <div
          className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:mt-0
        lg:justify-center lg:space-y-0"
        >
          <img
            src={urlFor(collection.previewImage).url()}
            className="w-80 object-cover pb-10 lg:h-40"
            alt="Apes"
          />
          <h1 className="text-3xl font-bold capitalize lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          <p className="pt-4 text-xl text-green-500">Lorem ipsum dolor</p>
          {/* Mint Button */}
        </div>
        <div className="w-full pt-8">
          <button className=" h-16 w-full rounded-full bg-red-600 font-bold text-white">
            Mint NFT (0.01 ETH)
          </button>
        </div>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `
  *[_type == 'collection' && slug.current==$id][0]{
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
  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })
  if (!collection) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      collection,
    },
  }
}
