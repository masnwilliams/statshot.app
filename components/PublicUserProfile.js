import Image from "next/image";

// UI component for user profile
export default function PublicUserProfile({ playerSR, playerCSR }) {
  
  return (
    <div className="box-center">
      <h1>{playerSR.additional.gamertag}</h1>
      <div className="flex">
        <Image src={playerCSR.data[0].response.current.tier_image_url} width={100} height={100} />
        <h2>
          {playerCSR.data[0].response.current.tier + ' '} 
          {
          playerCSR.data[0].response.current.tier == 'Onyx' ? 
          playerCSR.data[0].response.current.value :
          playerCSR.data[0].response.current.sub_tier
          } 
        </h2>
      </div>
    </div>
  );
}
