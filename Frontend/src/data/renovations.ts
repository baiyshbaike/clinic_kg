export interface RenovationImage {
  title: string
  src: string
}

export interface RenovationDepartment {
  id: string
  name: string
  description: string
  order: number
  beforeImages: RenovationImage[]
  afterImages: RenovationImage[]
}

export const renovationProgram = {
  "title": "Ремонтные работы",
  "subtitle": "Модернизация и обновление отделений больницы",
  "description": "Масштабная программа модернизации клиники была запущена в 2023 году с целью улучшения условий оказания медицинской помощи и внедрения современных технологий. Ремонтные работы затронули все ключевые отделения больницы.",
  "beforeTitle": "До 2023 года",
  "afterTitle": "После 2023 года",
  "beforeTabLabel": "Больница до 2023 года",
  "afterTabLabel": "Больница после 2023 года"
} as const

export const renovationDepartments: RenovationDepartment[] = [
  {
    "id": "1",
    "name": "Отделение Реанимации",
    "description": "",
    "order": 1,
    "beforeImages": [
      {
        "title": "reanimation_old",
        "src": "https://images.ctfassets.net/105muke5h44i/7izyaA8ZB00j2KuJ3vHim0/28142553a79b3fc3e3b6455163c90f9a/img.jpg"
      },
      {
        "title": "reanimation_old",
        "src": "https://images.ctfassets.net/105muke5h44i/72fILPUqjNmtLZDBVKXVHc/42f4d72c471c35685eae88d3824f3468/WhatsApp_Image_2024-06-11_at_14.59.40.jpeg"
      },
      {
        "title": "reanimation_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6JyxpXRCGamruwYYCefHuv/90a5ea72b7faaf40a5371228e00c9f01/WhatsApp_Image_2023-10-31_at_10.50.25__1_.jpeg"
      },
      {
        "title": "reanimation_old",
        "src": "https://images.ctfassets.net/105muke5h44i/40GMT1KEpaFhKN8qXPEHTQ/524db6d7ee34e64ab1857607d8042e3a/WhatsApp_Image_2023-10-31_at_10.50.25.jpeg"
      },
      {
        "title": "reanimation_old",
        "src": "https://images.ctfassets.net/105muke5h44i/2hmfFWquByBb0BwY2oCPCa/792f6e66455ab3f95ba8c986ec030a23/WhatsApp_Image_2024-06-11_at_14.59.40__2_.jpeg"
      },
      {
        "title": "reanimation_old",
        "src": "https://images.ctfassets.net/105muke5h44i/BY6E9llQ2KNqKhuqaJgma/bbf9b295b426b9c564740b9a9e511490/WhatsApp_Image_2023-10-31_at_10.50.24__2_.jpeg"
      },
      {
        "title": "reanimation_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1FWBJLl5y0lwpVRxNufBVn/e198481a1028a40e639300794e0f9b99/WhatsApp_Image_2023-10-31_at_10.50.21__1_.jpeg"
      },
      {
        "title": "reanimation_old",
        "src": "https://images.ctfassets.net/105muke5h44i/01zA0eU1baICFKbitPwroQ/33826844a2fef2a14bce93fd1ec556e8/WhatsApp_Image_2024-06-11_at_14.59.35.jpeg"
      },
      {
        "title": "reanimation_old",
        "src": "https://images.ctfassets.net/105muke5h44i/4JCqUc6k3qn8Rw9Wx8hN53/92c487d302ec93e39b03afcaad5f5a87/Ð_Â_Ð_Ð_â__Ð_Ì_â__9.jpg"
      }
    ],
    "afterImages": [
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/nfcjlcAwaaHMHunTzrdHi/8026a10a6f49ed56a7732ad366d9916f/DJI_20240202_102000_710.JPG"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2QenQE4KaT0gsLuitw3mI2/96340224c8b5ae1db33fb8e6586063c2/DJI_20240207_120643_604.JPG"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3vaMWCT1ZRyK0rE3qCLWPP/8c3d3c8e8573fcf00af3517b171e9e60/DJI_20240202_102153_126.JPG"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3tAhaeqtbrGTiBbE15O3pe/7d9cc52c9e57b29be98e32156bbe1e49/DJI_20240202_102104_120.JPG"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/7Fcuafmolw1ARid84HjOJ7/c326ffd02ca91346f67965ac70b1b1ab/photo_2025-10-01_13.11.08.jpeg"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6dNHI9uoaBTiQeSP1cPysk/4c1c19dd32fb3efef28defa8afce7239/photo_2025-10-01_13.11.45.jpeg"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1eH80JBuHc5I5wIDqUIrKI/eb6cec59539d495dbf5f728e0d88d220/DJI_20240202_121624_987.JPG"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3F89o4zIugJFDYh4zUp023/a70434010783e5b84a422c453314b96e/DJI_20240202_101052_052.JPG"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1yjhncb2tCJi5Sww21lCAc/8d44a42b06637e2904ee75dc5fa491e0/IMG_8368.JPG"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1O0GcmilCRC2jSXxwHQDa6/7be7fe3da81e9943cd0b4f7b7789cdc6/DJI_20240202_102231_871.JPG"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/Q4y3miENSKeUkWvFFaAQB/b34ba2472840c5aa72a5aead7226bf6f/IMG_7424.JPG"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/28go8qMhxKt5bX7hBmc2Ju/e4a74324c89328c5e9a1220efb6a840a/photo_2025-10-01_13.10.57.jpeg"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3VjqKVN6K1NWWCtQntibLV/d053c90a64d71e3b8b818b72a12d93b6/photo_2025-10-01_13.11.01.jpeg"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2DMSkIWlM8UplUI82PubCk/4c017fa862f68f7917f24dff92f302f0/photo_2025-10-01_13.11.05.jpeg"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6LjkXC0nY4DewurbQXWTJe/cbe801cfe68b263ffac15a4a8188950c/photo_2025-10-01_13.11.06.jpeg"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/7bqJssKIogWcyndxS7kxuA/14df6849b4b9b146aca0d2e7b315d527/photo_2025-10-01_13.11.00.jpeg"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/n888v4G4u0qTpT673pq0B/8f1b16fda8406ae66ee36264d10e29cd/photo_2025-10-01_13.11.04.jpeg"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/7rZBCiRK19AY0DVfiC3k4v/bb4a47814ae3a56288ae107e10db4b1d/photo_2025-10-01_13.11.03.jpeg"
      },
      {
        "title": "reanimation_new",
        "src": "https://images.ctfassets.net/105muke5h44i/70TddQ5cuSrXsLMChqzMeI/604c0827ab60d153e40646d5450acbc9/photo_2025-10-01_13.10.59.jpeg"
      }
    ]
  },
  {
    "id": "2",
    "name": "Общий профиль",
    "description": "",
    "order": 2,
    "beforeImages": [
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/38GqV2EpzeA1soshSr5UV8/851b390a46cab08e7ede513daef983c1/5442656942486051284.jpg"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/49gslbLeGYqs0svXS1es7i/58e56ea9bc7c65efb4a9a6d390d2a58c/5442656942486051286.jpg"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/KjF5xfw82mMuTMzxafTBe/4446e30b261c38e14e4401d8bfbcf684/document_5364228511332581197__1_.mp4_20241111_100654.632.jpg"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1IvS8tJGSBh9zjlguYFu0i/293de25100024267679e56b123769ec8/document_5364228511332581140.mp4_20241111_102129.304.jpg"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/FqrQFyecML9X9Fl61DOLu/ea280e72f7b1494a87eeeed39e1b9dfa/5442656942486051285.jpg"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5TlI4PpJvPdDDE2EyVlBwI/9dea19c4d2413938cd24a841c5dcff7e/5442656942486051305.jpg"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5DBfnr1sOir0gempniMIVF/7e5982072d404d28b974f458ac276740/5442656942486051306.jpg"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5pSTDBsUzJ9TvZyC3wmGXU/200a76ff1e39b0a0aea4ea972f33ec27/document_5364228511332581197__1_.mp4_20241111_100636.016.jpg"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5OH2fAz2gjbwi33Vu9np9m/7c4f6994995b9d6e3f0d59f1ff265c43/photo1718643570__5_.jpeg"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/4Yu3kKb1cjcsyhaHSDOBNu/8153ef902bfce6b870b2607fc227f329/IMG_7224.JPG"
      },
      {
        "title": "general_profile_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5X8CzS1CM4wMduQ71V1EzV/dd021cdbed08b4e04bce96c98dec18e2/IMG_1878.jpg"
      }
    ],
    "afterImages": [
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2qBSJmO8YqiyIu8gnDRirj/7c099410e94a67ed7b185f2fbd680b48/5265113534319165541.jpg"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3NkBHw2OgRnb0ll0IeskAf/dabf5ebdc80f9a6373cfed50eb24cdb8/5206464329963133170.jpg"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6m42CZMbfeMtyqergk0kOD/312a9b9199486f3164921678d716f163/IMG_3321.JPG"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3bGmWuK40Disg8zQHESGTV/d3be12ad14f75a999a9c7daea26d8fe8/5206464329963133186.jpg"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1NoqdnHAF20HcihGLyqqSj/1a2dab6fc1ad7c7bbda48874e8b09c21/photo1720181864.jpeg"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/4G5V90wySkrK9LaXxswSk9/9617555f3bbdb787184f2288ea8dcf6a/5206464329963133188.jpg"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6QkNiM5awPttePnphCoOGv/05a9cc313be8f9b6f4c736c98ffcc0aa/IMG_3339__1_.JPG"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6hEH9zuvTiPIHhphTAo8aO/594841265865270ae9ef1b77d86a35fc/IMG_3334.JPG"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2S2xC7kPZeOGEZFNkaBFpj/0e61a1bfea70a7dbe079f5252f9f40ac/photo1720175594.jpeg"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/4sP2k00CePnI179MnGMLJm/730b2be21e07db44d02abf40cf29b0da/5206464329963133201.jpg"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/ajHs644Hrlu0kJAROvirC/06081d50364ab74867eb05d177383b16/photo1720181761.jpeg"
      },
      {
        "title": "general_profile_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6UAxPTEDwIEYhAZMV6PawU/2ddd40876dc43982458639434da863b2/photo1720174985.jpeg"
      }
    ]
  },
  {
    "id": "3",
    "name": "Бактериологическая лаборатория",
    "description": "",
    "order": 3,
    "beforeImages": [
      {
        "title": "bak_laboratory_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1VpNXOx7Qw67Vq99VL0Vdw/09dfd5c0ab1a8fb1e55d3a0921f34ba5/DSC_0062.JPG"
      },
      {
        "title": "bak_laboratory_old",
        "src": "https://images.ctfassets.net/105muke5h44i/McZ0Y9yfPOpVP50BRf56W/1d817f632b0f822d2802da2ce5e1c90b/DSC_0059.JPG"
      },
      {
        "title": "bak_laboratory_old",
        "src": "https://images.ctfassets.net/105muke5h44i/sg2XwhfGGVIub3AzDIKD1/ba264aff249a7a5044f7d740d20c2e3d/IMG_3615__1_.JPG"
      },
      {
        "title": "bak_laboratory_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6To6LdMIqfLEB8FGuomDOj/2be5ebf1f211e10b0ae71ac066b082e0/5287711749560198107.jpg"
      },
      {
        "title": "bak_laboratory_old",
        "src": "https://images.ctfassets.net/105muke5h44i/01LC3w738tuEkmbf4Wy5Sy/d46903038c0e5546b3df33cc03f9e297/5287711749560198101.jpg"
      },
      {
        "title": "bak_laboratory_old",
        "src": "https://images.ctfassets.net/105muke5h44i/4BcyIZGeNfvs2C9DsUypGq/3d47503671a36b6000766c30b4cc18ee/5287711749560198118.jpg"
      },
      {
        "title": "bak_laboratory_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3ekrCEfozcJw0GJs0IdjQq/bd8668c3e57ae8456073ae3685674202/5287711749560198109.jpg"
      },
      {
        "title": "bak_laboratory_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6ZTmEB6Oh6ITyPDmFMgFs8/6e17754880e777f2957191c3080b3ecf/5267365334132849434.jpg"
      },
      {
        "title": "bak_laboratory_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3LnYiH4R5Z1ASwe7gloLbZ/35fbecaa7eefa0a9f9e64e6b5a2ba5b6/5287711749560198119.jpg"
      }
    ],
    "afterImages": [
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1gTUjxqmwVvSzV3U2gfl1x/aac18b07f71437609bc7f6614b98324c/5267365334132849427.jpg"
      },
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6d8618kjPRVB71pWoZjmlQ/24d66875ad94caec4c7c293e10dcbc83/5267365334132849429.jpg"
      },
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6AUEdOCdKlPhfx6xMRIiGw/a34b288a3784e9b596b9a489e33fb07d/5267365334132849404.jpg"
      },
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5TiIJFpZWTnNFoF0VIDX2s/2b7dc49a081c1defbe0d609cc5408f5f/5267365334132849412.jpg"
      },
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2nbq3xdHJEhHXJcMd3Hnzv/d73bb548acfcfae8b125858cfd7f0cce/5267365334132849442.jpg"
      },
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3hXF1LMpDJLMTpoJPyQnqs/f9cc6cfbf4f006736145e30e70f1a9ed/5267365334132849407.jpg"
      },
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/52TVpaLkRi2zsoRcjAC4z6/9b39134dc71dd9b76e525c7fcb3ee180/5267365334132849430.jpg"
      },
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/4bItpZYxfNrgzOqxml1uf5/12990360604fb53f4563ae426cd9dec8/5283282418507309192.jpg"
      },
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/290nSeYaUqj6361wzN2DH2/96f93850b22c97eb0bd775b6ceaad6e2/IMG_4499.MOV_20250818_003526.396.jpg"
      },
      {
        "title": "bak_laboratory_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6kdtp2PoTu7BUn3IfzowxA/e0fa6d6aaadd37033b2d6a2e57b26df4/IMG_4499.MOV_20250818_003551.308.jpg"
      }
    ]
  },
  {
    "id": "4",
    "name": "Пищеблок",
    "description": "",
    "order": 4,
    "beforeImages": [
      {
        "title": "Hospital_kitchen_old",
        "src": "https://images.ctfassets.net/105muke5h44i/7kCZLIn6nlv03iRwXSLJbn/0272b1d707bf18f77981ec609b3913ea/photo1718643580__14_.jpeg"
      },
      {
        "title": "Hospital_kitchen_old",
        "src": "https://images.ctfassets.net/105muke5h44i/4RIxZwhxKLDGhulUtqVRXL/275ecb32fe462dc514847af0eda117cc/IMG_7314.JPG"
      },
      {
        "title": "Hospital_kitchen_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5yGHYkb0Sr62jkRPvJuov7/542fffdec4b969c1964e1fd0318cf6d5/5442656942486051380.jpg"
      },
      {
        "title": "Hospital_kitchen_old",
        "src": "https://images.ctfassets.net/105muke5h44i/54lDF5E1yiXdHW2xDZ29oO/9afb6ed7679b68a618c4aff32305d302/IMG_5842.JPG"
      },
      {
        "title": "Hospital_kitchen_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6rTlxUh4gu5Ct94r5v4SeP/4ca97cfb787595e7f5735ff4e921d016/5449731449407265510.jpg"
      },
      {
        "title": "Hospital_kitchen_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6M0dNN9v2e1mCqMA0zkKxC/561d15eba655cbf30432b480175d04d1/IMG_5847.JPG"
      },
      {
        "title": "Hospital_kitchen_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1t5xmOjK1HFDxKpasjj96P/2af375395291c50b7334895ad8196ccf/IMG_3466.JPG"
      }
    ],
    "afterImages": [
      {
        "title": "Hospital_kitchen_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1mhHZb5kvfmdmZ8nGQF00W/48c7433f3247264226e5d45391b26f98/IMG_3223.jpg"
      },
      {
        "title": "Hospital_kitchen_new",
        "src": "https://images.ctfassets.net/105muke5h44i/mdS4eaEqIylksyLK1pptK/e53f58838631826098afbb804fb9e447/5206464329963133245.jpg"
      },
      {
        "title": "Hospital_kitchen_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5B6CBHVadlt7f7BZ0LuzYZ/d5d1aceb8c89f6d06db738f6ff812fa1/5206464329963133236.jpg"
      },
      {
        "title": "Hospital_kitchen_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5Txkz9iqyZHcyc3OuCnGKf/ff80d29a078684dcac41e241379dddd0/5206464329963133239.jpg"
      },
      {
        "title": "Hospital_kitchen_new",
        "src": "https://images.ctfassets.net/105muke5h44i/UElFBKukA2u8pumwErLCS/de4b4521f5866fc26722cd9e442662cc/5206464329963133241.jpg"
      },
      {
        "title": "Hospital_kitchen_new",
        "src": "https://images.ctfassets.net/105muke5h44i/53ywSPurLr30BbCZi1CiAc/fb404ea43d1fcd69a8044ac71059f6c7/5206464329963133235.jpg"
      }
    ]
  },
  {
    "id": "5",
    "name": "Дневной стационар",
    "description": "",
    "order": 5,
    "beforeImages": [
      {
        "title": "day_hospital_old",
        "src": "https://images.ctfassets.net/105muke5h44i/2H7jKtKm7u8PxIChwzTy1g/687bbf2c48639bbb0e38dc7ee5f3230f/IMG_7849Ð_.JPG"
      },
      {
        "title": "day_hospital_old",
        "src": "https://images.ctfassets.net/105muke5h44i/NYzEl2mqEx8BJO3U5teXV/37198965818813f75936f2c00fc3964e/5240327776270146768.jpg"
      },
      {
        "title": "day_hospital_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5X8eVGGnOuRbdQFBDHskgX/e3f62d58e1b65ab6177b0b0080841802/5240327776270146759.jpg"
      },
      {
        "title": "day_hospital_old",
        "src": "https://images.ctfassets.net/105muke5h44i/4uksNjzidTrq2InLSleKMG/cd069d3190b7816964df228e455a1a99/IMG_7846Ð_.JPG"
      },
      {
        "title": "day_hospital_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6WjkZaZmOayqLZN6twXqLf/16731e2412295d304da99698160721ff/photo_2025-10-01_13.01.19.jpeg"
      },
      {
        "title": "day_hospital_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1cxTOrSsf6VriSoXV1dTDw/d36bdd3effba998a30bd0b9287514369/IMG_7865.JPG"
      },
      {
        "title": "day_hospital_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5RYdsecPXfz6O9jIrNCFvX/e4251fab2765711d49b2680fe0df30b9/IMG_7856.JPG"
      },
      {
        "title": "day_hospital_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6cHGs0lcGnYH6uiWzW8FB8/697cacd1ca5e5dcd61bed83cb8489a4e/IMG_7847.JPG"
      }
    ],
    "afterImages": [
      {
        "title": "day_hospital_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3TVGP5cul2MnkjTLBvbyFK/339d9d59edd9708ab9efcd0544234eed/5267365334132849603.jpg"
      },
      {
        "title": "day_hospital_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6Hjh7DAYDK6tQbgRfxGolC/ff3fa66cf6b04280383db51d2a83b924/5267365334132849597.jpg"
      },
      {
        "title": "day_hospital_new",
        "src": "https://images.ctfassets.net/105muke5h44i/d8pRINhQzwHyhjP2LzzUc/e5db284477f65074ed173efabe3510d3/5267365334132849599.jpg"
      },
      {
        "title": "day_hospital_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1c9DJih8Viaq2ihTkc56XQ/6298755c4a517da147686feb4bbad2b1/5267365334132849607.jpg"
      },
      {
        "title": "day_hospital_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5ekWg0sI3xKiYOK9NehmZi/9e6766084c6683498180241058c731e4/5267365334132849612.jpg"
      },
      {
        "title": "day_hospital_new",
        "src": "https://images.ctfassets.net/105muke5h44i/4Yc0qCHIfgyqAj4voGqlGb/5ca7a40253acb9fab41497619792d4e1/5267365334132849615.jpg"
      },
      {
        "title": "day_hospital_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2lE1z9K6WICz25xlbrrfWD/e62625b7aa96042eeffc0b6825ddbae9/5267365334132849605.jpg"
      },
      {
        "title": "day_hospital_new",
        "src": "https://images.ctfassets.net/105muke5h44i/4WbFnuOB7VYBemYtAYdVQl/98148d5363b1254a27c81c9d31c9fcb9/5267365334132849609.jpg"
      }
    ]
  },
  {
    "id": "6",
    "name": "Прачечная",
    "description": "",
    "order": 6,
    "beforeImages": [
      {
        "title": "laundry_old",
        "src": "https://images.ctfassets.net/105muke5h44i/4PiOJH4SacoSsbgjLaE1Ue/04073681292b6e15b7c206db30b2bd72/IMG_1767.MOV_20250818_004452.524.jpg"
      },
      {
        "title": "laundry_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5Yvbp5DKF1sXUwIm5pl8oC/2deb24833dd116f004e0a33bcfaf5ff6/IMG_1768.MOV_20250818_004506.115.jpg"
      },
      {
        "title": "laundry_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3IqNB83uwdeSnt0Hjh7Fcj/78f7c0c6d00bb6eae72f5c167cdecdca/photo_2025-10-01_13.20.41.jpeg"
      },
      {
        "title": "laundry_old",
        "src": "https://images.ctfassets.net/105muke5h44i/764jvulWQISqrsUjJaGl9B/e730ba9fa3cc0844045ed9bb254a69e6/IMG_1767.MOV_20250818_004436.196.jpg"
      },
      {
        "title": "laundry_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5qyMks3kQE8QqYJXA5zsTP/364f7c2ab298106a20635563b1ba7fb3/IMG_1769.MOV_20250818_004555.979.jpg"
      },
      {
        "title": "laundry_old",
        "src": "https://images.ctfassets.net/105muke5h44i/38qqHtejoY0WoiGcMOeNj7/aeb07dc34393d893aa83e9aeae028768/photo_2025-10-01_13.20.38.jpeg"
      },
      {
        "title": "laundry_old",
        "src": "https://images.ctfassets.net/105muke5h44i/4RbvABabqabFlH7VoWzLw2/13e54cd28e216e117a7e959d420ce89d/IMG_3570.jpg"
      },
      {
        "title": "laundry_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6aeNPmMzEpEScL8pC1tDfG/09908c67a21655be7c1d8887c86979e3/photo_2025-10-01_13.20.25.jpeg"
      },
      {
        "title": "laundry_old",
        "src": "https://images.ctfassets.net/105muke5h44i/LKCLCBw5edxaOY74iBale/16c0dc78426f0b73fbc00c59b9694094/IMG_5058.MOV_20250818_004905.651.jpg"
      }
    ],
    "afterImages": [
      {
        "title": "laundry_new",
        "src": "https://images.ctfassets.net/105muke5h44i/534RwBhkewwsL2iYFlapDy/3f2eba36241a43742e3aebaae4b1e695/5267365334132849460.jpg"
      },
      {
        "title": "laundry_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3JI5CJK8s7LKSKjnNdUElm/a026ddd72f7efdee94292017bbe6c821/5267365334132849464.jpg"
      },
      {
        "title": "laundry_new",
        "src": "https://images.ctfassets.net/105muke5h44i/20CnfHnl2IWQblPKokLgLK/dedd0d695dd257b03b687ddf75a68b11/5267365334132849469.jpg"
      },
      {
        "title": "laundry_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6MhBVkJ7C2vwvWx4l4VtOS/c31dff95d552ff147481e3c069323cd0/5267365334132849472.jpg"
      },
      {
        "title": "laundry_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6N54ZG9oaswE4iWoCulA0s/5330dafff51bbf18c70056ae2ecdf445/5267365334132849479.jpg"
      },
      {
        "title": "laundry_new",
        "src": "https://images.ctfassets.net/105muke5h44i/4AE30IFEtj49nrW3HzbT5/795300bbf5fd6799afe531889e632742/IMG_4659.MOV_20250818_004830.587.jpg"
      },
      {
        "title": "laundry_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2ivhUKSDLbOpUcgREPrxQt/9c2ae36626a9e544d60f1687fe585208/5267365334132849478.jpg"
      }
    ]
  },
  {
    "id": "7",
    "name": "Отделение Кардиологии",
    "description": "",
    "order": 7,
    "beforeImages": [
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/2YJRNGs8amxLm8C1FpTxtW/31bd57e267157b53f2e1a4efb012e918/IMG_6955.JPG"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3Lf5veHZsz9Vnz6q46sNf7/17da530ad2ea91b4cc93d3102cf1653f/IMG_5655.MOV_20250818_005459.690.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1AD2CIne8PETWmwAvlzYLa/3aff7356b0a68573e48c93ef94dbfd51/IMG_1879.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3vs6OLJON2G50mcwwzFOUe/c46212ec90aebf8b1e479c0e274e7237/IMG_5651.MOV_20250818_005443.171.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/7yu9r6IgaEXUBcZl6zRU5w/23e97d270e2fa2ebaf83678a35d5fc32/video5467560060060202043.mp4_20250930_114515.961.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5nTWktloPKaZIqwwuTitO0/682d67342333b1e187f26a415704885f/video5467560060060202041.mp4_20250930_113429.728.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/XQ4uFINM6c94HyKmSmLu8/e59078eb33cc3a00314c602002acf5cc/video5467560060060202043.mp4_20250930_114525.415.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/7L8hx9QZP7zifTKxuz00I8/087e4dcd287ac2ed2ffe50ebe4dadfbb/video5467560060060202042.mp4_20250930_113609.158.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/57yFaLZUFRLukaT0fXGWd2/84daa43ee47333f38fa2cd47fd42a1a5/video5467560060060202037.mp4_20250930_113224.330.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5bYBNlCD5O2Wg2vCbABhVQ/2b72751311fc6f7073b358efd0976110/video5467560060060202042.mp4_20250930_113926.260.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/2vtPOPSFI4b376q11P1VZi/86fe9912fed78b012088a0b4ffa4d48e/video5467560060060202041.mp4_20250930_113337.273.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/0ndx5cUMM1OwYpYKdQgL3/b60071311d20920f77fd516af6b84e3b/video5467560060060202042.mp4_20250930_113438.856.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1sARINChYhGLdjCTcMXKKL/e02fc9217c7c5e58bb808d2ba08fb62d/video5467560060060202043.mp4_20250930_114451.769.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3k8gzSGk43AjQFwic3LvBC/2675c8c2030f5aec6c5e56d1f3b4aa8d/video5467560060060202029.mp4_20250930_112719.342.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/69wOEfcX6QL71nlzjLEejK/67c329daf1b4ab146a1825ce1d77f802/video5467560060060202020.mp4_20250930_112444.208.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/2jLh3jQmSg9YFWqm76I4EH/b498caf3cc3cee79efe961135d842b09/video5467560060060202033.mp4_20250930_113033.347.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3UYHJfWAoCpGrrol9te8Ox/146f593106befb76e32686c4aa1565d1/video5467560060060202018.mp4_20250930_112411.593.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3Lrl2ZharPNvpPNHsRSQ03/4960b6a9de2d7789df6e6682b19f8f1d/5467560060516429415.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1Ye1zjp7md0jzofYv5sWhp/5343221c33e14ac3fefdc8d0a16e30df/5467560060516429420.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/kesJNsGWc7KVH8NfLHHUY/5131fd7630441be989c0928ab8912a9b/5467560060516429332.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/4k29n5wfJ2kjSR4cQuIwy7/f983c2154c23e66e9c9cd92730428b08/5467560060516429329.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/7s0CGeBNURidIdLDdjpa8x/cde822e74779c81035dfe74554f1bdb7/5467560060516429330.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3EbQUqQFHTzAQkK93hhHvb/89406a7033bdc8453227fc9783d974c0/5467560060516429328.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3lt8n3zw8FfN6doBYjXJwd/f4cd7e559b60abc95218a85399d1555e/5467560060516429333.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/38L9Byt3mdwe6FtHMeCjvs/57136c4e9e5e5421c70c94848de8806d/video5467560060060202018.mp4_20250930_112329.625.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1nZqvLUlehlNxEzcKpk874/2ffcecd0a442dd8a50fdc52a28ee828b/video5467560060060202008.mp4_20250930_112319.322.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5874xBw58E3RXgnO9XRLjv/571bbb43c2e53d96acd5317e547a9d32/video5467560060060202008.mp4_20250930_112307.935.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3BwV3TgQWAorNweEgzRw80/b1dc16a69078214a488d167ee0bb8fc0/video5467560060060202020.mp4_20250930_112451.232.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6aIxCERE7jsOBbvE4UtYyh/64197b281f5369447b64818b4088f4ef/5467560060516429347.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/4dFPEfILKdBHH9bB5qU8Wv/2b9bb66d7a680ebe607468f622277d3a/video5467560060060202043.mp4_20250930_114600.132.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/3apWnrG0CXzbkJK732NRPI/1a1901ad7c7298a946a61b0d1593b84a/video5467560060060202041.mp4_20250930_113346.505.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/27ylp5rxwCqW15rnJtO5lR/082e114533627c21f9b0d73f27ef24c9/video5467560060060202035.mp4_20250930_113204.786.jpg"
      },
      {
        "title": "cardiology_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6MlO7R1mRLtVgn9n1yCCVo/efd9cbdf194e713c75566c88d1f7637a/video5467560060060202027.mp4_20250930_112640.999.jpg"
      }
    ],
    "afterImages": [
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5ubCe3MOtVgsB9Qe04kkdf/dc4cf83e392557d61aa3e0d20a886c27/5467560060516429460.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/32c4SmL2jRI3ZfpA4kLM2/8e868b2a7a3089a26c7dabe8b95e4e76/photo_2025-10-01_13.16.12.jpeg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1FIZNuLlRsWthCGrjCqieP/75dfecf0169aa85895611aca6eb0b444/photo_2025-10-01_13.16.13.jpeg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2pX75hPq1VjgaeBFcgosJy/effd57e53c4b27cf48b1b5cd581fb9f4/photo_2025-10-01_13.16.08.jpeg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5mvHDIiyFN4yH1ps4fiZ9v/688e3f4940b0d18a3d4bec7ca7f457ba/photo_2025-10-01_13.16.09.jpeg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5xomN0BI85rHxF0Zk5t2jR/578e0b3df9e4c6564a35e9858b1b39c1/photo_2025-10-01_13.16.04.jpeg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3ELavv3pYGGnF555UVGLOq/bc4c55163ba745e2e4eb88b0a3e5980c/5467560060516429455.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5QG5nxmWG0j3U6kQl8BiVo/8b79ce11c0200b1fa2299250f0bf2b9a/photo_2025-10-01_13.16.10.jpeg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5kCVM3u8e9oTn6T11zi7pd/511ab8e6dd992992b415f196902602a3/5265113534319165196.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2tFLFqYgYCUBmwz5biH8rO/d1348444e529ffa4af81be8d83811dfb/WhatsApp_Image_2025-06-25_at_10.29.32__1_.jpeg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3MtdgiYfdrKbeQoBQRBmKn/d348542c8956bf88f0ad7750c12dbe93/5265113534319165189.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1j6PNZZLcLUuSKNiAJl8KB/c8aad2af2f8ce8366d95c686aa149578/IMG_7424.JPG"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1aK4t6oliznxoSzaKQlFh7/1c5373bc9d8475add076936fb1e8fe3d/5265113534319165175.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6I1PtVMMluq1WSGcHayv5T/e976da088a8fdf4e8ba18eb025b55c9c/5265113534319165178.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/4PPBTAQBdy8XxjhEP9akdt/34b7acad4e62629ca8ea65beac178a15/5265113534319165182.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5QbgImnYnpEsTIk8kkDwTb/8211de6331bed21987c1f01bf1396f81/5265113534319165172.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/ChRvOMssnOzdpyXIQOkZv/61ac032280a3ff92c0856addfdbddbc5/5265113534319165171.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2v9jrR8nahTCkBPoBZDiXS/a4795e791f4f1102aa30af9316c6626f/5265113534319165179.jpg"
      },
      {
        "title": "cardiology_new",
        "src": "https://images.ctfassets.net/105muke5h44i/4JFwSWzBijpudPw6Qo084q/7aa06f470d996930b3b24af52c3cac40/5265113534319165184.jpg"
      }
    ]
  },
  {
    "id": "8",
    "name": "Поликлиника",
    "description": "",
    "order": 8,
    "beforeImages": [
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/7GVlOnhAKDL6ZB2O8ME6Vw/55c3523c45a53b3cb24bcfab5ecc5912/77.jpg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1TcwjSLRw1iJHT5HLdVk8e/cf1715b547790a57275b57cb30a54a0a/5265113534319165283.jpg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/28nM2OXYsbLcH5h0faeLpo/7cb3356fefb425ca63aceabce8f4f8a0/photo_2025-10-01_13.26.35.jpeg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/wqzyiBPWXtseIymfaSPEi/f2f591b4d598a0a7c7870b0d45568a87/122.jpg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6vuM6tc773UooiNdCWDngy/e25b3b6c94c1476d24d5504a549198a8/photo_2025-10-01_13.26.39.jpeg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5LqzAUPqftnSi0mvFdrW1W/5f3af93484a0c4c26c152ecc5e1c9659/5265113534319165255.jpg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/5S5OypaWsdMkzDxc1H9E2n/95cb93a63fc7d34108c27576fa537622/photo_2025-10-01_13.26.38.jpeg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1vsS3Pl7aNOvXYMwx7LCr1/1da47918b70389e1e650aa4504d44776/photo_2025-10-01_13.26.43.jpeg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/1vSY7eKgW7rVMuobn5YpJn/e64ec5de42683cc6c0e8b2a43cadd016/photo_2025-10-01_13.26.40.jpeg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/2sYNzHfedLdlXIkkBpY95P/af233b17a368a15db10fc5484365b342/photo_2025-10-01_13.26.42.jpeg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/2E0VTrNhG00igLj6dVHoeO/5ab4c69904f309824562b6952ffc48a5/5265113534319165257.jpg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/6iehdFnXk2S1hhmhNnjvYi/3f2543bcd19308936b19d53e5ef47d3d/photo_2025-10-01_13.26.44.jpeg"
      },
      {
        "title": "policlinic_old",
        "src": "https://images.ctfassets.net/105muke5h44i/61U6MIbmyjKZvqN0ewxR6U/ad2367c46c4733813ef837108ad82d40/5265113534319165256.jpg"
      }
    ],
    "afterImages": [
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/RlwfbYtPkIyuQJsUGnriG/f092c4fc172c207211db7aaad7051a5a/5267365334132849627.jpg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/kmwtyDAeTioRcqBmNtuU0/04493d7bda12060da7816866e0268350/photo_2025-10-01_13.26.55.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1jq8fZHAsj19Ym59qUtq6S/0e4a1f080d65a7b154bc9f01a19eede8/photo_2025-10-01_13.26.51.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3L5OFbwsYxsXXp2Vy4lS87/570efe532417f892c4efcd8f34e25290/photo_2025-10-01_13.26.49.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/ZoGN8MxXw7z4C6N2RRL35/9a55f4f04f837f02408a6be5102eadcd/5265113534319165231.jpg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/21ephVzc870O1KuvtEIdVF/05aaa06d21c2f14a1747b82ee8109f62/5267365334132849649.jpg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3nvjdqckrfmnTnw6in3Uhz/cef59f70bd16f6c3ad8b5a0f4dd421ce/photo_2025-10-01_13.26.46.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2OjgCkYChNQj0G3Zssnenn/e6ede95dcfbd01c7229bffe95ce57816/photo_2025-10-01_13.27.01.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/5dBVHXC9Z6FPtznxRxsdsC/13bf6b220d70f46988b085af5e4a4a36/5265113534319165169.jpg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/ZoGN8MxXw7z4C6N2RRL35/9a55f4f04f837f02408a6be5102eadcd/5265113534319165231.jpg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/2wR4xco3K4FPg5DZ4bRH6A/12b05b8b591fd403542f42f335b3d676/photo_2025-10-01_13.26.48.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3FwHRo1rGhIYxrYT62IoDd/0837e323c18c4124cd90edb4ffde578f/5267365334132849651.jpg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/7tqIQJ7F2I5HP9irw6zqck/335a055ce7ea923bc59d3a221e7e091b/photo_2025-10-01_13.26.50.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/4pyht1ZrxkmxDgkpz7ACGj/061505260d0a07fefe7a988d86df5ed4/photo_2025-10-01_13.27.00.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/3gLh29ExJcO8Dm5pj8lUvL/b702d975d7eca100681f97304c062d02/5267365334132849643.jpg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/6bJ1qXAF8WiM1SAxC18TDt/3eda1570adc9877014c77a0368e87351/5265113534319165207.jpg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/7eIDYA4xVEfwJbiYgMlBPm/da637528d460a8e2571ea55a64cbe44d/photo_2025-10-01_13.26.58.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/1bXm78joMTA91wFN5GSXmY/b04458a0c237ce70cacb8381da36cacb/photo_2025-10-01_13.26.53.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/JMUmmbG7p8UqyRhxKqutz/22d60593433be951921fc41e094f6889/photo_2025-10-01_13.26.54.jpeg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/xRLzdrBiGxcgyTRP9vt2Z/0c4de5246e79c6217841794fd5a07d25/5265113534319165200.jpg"
      },
      {
        "title": "policlinic_new",
        "src": "https://images.ctfassets.net/105muke5h44i/H9ECNSOHF5ZeVTP6OqdAg/536554f99a272543bc3be8dfdf2ce35e/5267365334132849628.jpg"
      }
    ]
  }
]
