import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.PolicyCreateInput[] = [
  {
    provider: 'BARMER',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    startDate: '2017-04-26T05:32:06Z',
    client: {
      create: {
        firstName: 'Cyrillus',
        lastName: 'Biddlecombe',
        dateOfBirth: '1978-12-03T06:33:17Z',
      },
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'LIABILITY',
    status: 'PENDING',
    startDate: '2015-01-13T04:52:15Z',
    client: {
      create: {
        firstName: 'Brandy',
        lastName: 'Harbour',
        dateOfBirth: '1985-02-28T12:51:27Z'
      },
    },
  },
  {
    provider: 'AOK',
    insuranceType: 'HEALTH',
    status: 'DROPPED_OUT',
    startDate: '2014-07-14T00:54:34Z',
    client: {
      create: {
        firstName: 'Ailina',
        lastName: 'Harber',
        dateOfBirth: '1993-01-20T02:51:20Z',
      },
    },
  },
  {
    provider: 'AOK',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    startDate: '2020-07-21T19:40:35Z',
    client: {
      create: {
        firstName: 'Aguste',
        lastName: 'Bilsford',
        dateOfBirth: '1997-04-24T11:26:05Z'
      },
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'HOUSEHOLD',
    status: 'ACTIVE',
    startDate: '2013-03-30T19:27:54Z',
    client: {
      create: {
        firstName: 'Haydon',
        lastName: 'Ballay',
        dateOfBirth: '2006-12-04T01:13:38Z'
      },
    },
  },
  {
    provider: 'AOK',
    insuranceType: 'HEALTH',
    status: 'CANCELLED',
    startDate: '2021-01-12T19:24:41Z',
    client: {
      create: {
        firstName: 'Brandyn',
        lastName: 'Argyle',
        dateOfBirth: '2006-03-17T03:35:43Z'
      },
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'HEALTH',
    status: 'ACTIVE',
    startDate: '2018-05-11T11:56:51Z',
    client: {
      create: {
        firstName: 'Tani',
        lastName: 'Erasmus',
        dateOfBirth: '2022-03-06T08:51:11Z'
      },
    },
  },
  {
    provider: 'TK',
    insuranceType: 'HOUSEHOLD',
    status: 'PENDING',
    startDate: '2013-01-25T04:14:34Z',
    client: {
      create: {
        firstName: 'Galvan',
        lastName: 'Barmer',
        dateOfBirth: '1992-05-23T18:12:40Z',
      },
    },
  },
  {
    provider: 'TK',
    insuranceType: 'HEALTH',
    status: 'ACTIVE',
    startDate: '2012-09-24T09:55:17Z',
    client: {
      create: {
        firstName: 'Rozelle',
        lastName: 'Nipper',
        dateOfBirth: '2005-08-12T07:01:40Z',
      },
    },
  },
  {
    provider: 'AOK',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    startDate: '2020-05-02T05:53:46Z',
    client: {
      create: {
        firstName: 'Flossie',
        lastName: 'Camings',
        dateOfBirth: '2004-06-15T14:20:52Z'
      },
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'HOUSEHOLD',
    status: 'PENDING',
    startDate: '2022-01-12T17:47:41Z',
    client: {
      create: {
        firstName: 'Derril',
        lastName: 'Gildersleeve',
        dateOfBirth: '2006-02-23T00:10:07Z',
      },
    },
  },
  {
    provider: 'TK',
    insuranceType: 'HEALTH',
    status: 'ACTIVE',
    startDate: '2012-07-04T15:31:29Z',
    client: {
      create: {
        firstName: 'Amanda',
        lastName: 'McPherson',
        dateOfBirth: '1977-10-16T17:54:53Z',
      },
    },
    dependants: {
      create: [
        {
          relation: "SON",
          dependant: {
            create: {
              firstName: "Derril",
              lastName: "Madison",
              dateOfBirth: "2000-10-16T17:54:53Z"
            }
          }
        }
      ]
    }
  },
  {
    provider: 'McPherson',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    startDate: '2012-08-01T03:25:59Z',
    client: {
      create: {
        firstName: 'Garnette',
        lastName: 'Benda',
        dateOfBirth: '1986-12-29T08:02:10Z',
      },
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'LIABILITY',
    status: 'ACTIVE',
    startDate: '2014-04-14T12:39:02Z',
    client: {
      create: {
        firstName: 'Nia',
        lastName: 'Menses',
        dateOfBirth: '2005-06-10T22:51:36Z',
      }
    },
    dependants: {
      create: [
        {
          relation: 'FATHER',
          dependant: {
            create: {
              firstName: 'Yoko',
              lastName: 'Becker',
              dateOfBirth: '1985-06-10T22:51:36Z',
            }
          }
        },
        {
          relation: 'MOTHER',
          dependant: {
            create: {
              firstName: 'Sam',
              lastName: 'Penni',
              dateOfBirth: '1992-03-24T11:34:21Z',
            }
          }
        }
      ]
    },
  },
  // {
  //   provider: 'TK',
  //   insuranceType: 'HOUSEHOLD',
  //   status: 'DROPPED_OUT',
  //   startDate: '2017-05-28T11:56:27Z',
  //   client: {
  //     create: {
  //       firstName: 'Jeffie',
  //       lastName: 'Pinyon',
  //       dateOfBirth: '1979-10-26T12:24:25Z',
  //     },
  //   },
  //   dependants: {
  //     create: [
  //       {
  //         firstName: "Lisa",
  //         lastName: "Pinyon",
  //         dateOfBirth: "2000-10-26T12:24:25Z"
  //       },
  //       {
  //         firstName
  //       }
  //     ]
  //   }
  // },
  // {
  //   firstName: 'Mariette',
  //   lastName: 'Cristofanini',
  //   dateOfBirth: '2011-08-01T11:56:32Z',
  //   client: {
  //     create: {
  //       provider: 'AOK',
  //       insuranceType: 'HOUSEHOLD',
  //       status: 'CANCELLED',
  //       startDate: '2012-03-29T01:59:13Z',
  //     },
  //   },
  // },
  // {
  //   firstName: 'Jess',
  //   lastName: 'Whittle',
  //   dateOfBirth: '2017-08-20T14:53:21Z',
  //   client: {
  //     create: {
  //       provider: 'DAK',
  //       insuranceType: 'LIABILITY',
  //       status: 'PENDING',
  //       startDate: '2013-11-15T09:58:45Z',
  //     },
  //   },
  // },
  // {
  //   firstName: 'Graeme',
  //   lastName: 'Ternent',
  //   dateOfBirth: '1988-10-25T13:37:10Z',
  //   client: {
  //     create: {
  //       provider: 'DAK',
  //       insuranceType: 'HEALTH',
  //       status: 'ACTIVE',
  //       startDate: '2020-08-16T03:24:30Z',
  //     },
  //   },
  // },
  // {
  //   firstName: 'Valeria',
  //   lastName: 'Keysel',
  //   dateOfBirth: '1979-04-23T10:03:12Z',
  //   client: {
  //     create: {
  //       provider: 'AOK',
  //       insuranceType: 'LIABILITY',
  //       status: 'ACTIVE',
  //       startDate: '2016-04-14T02:53:58Z',
  //     },
  //   },
  // },
];


async function main() {
  console.log(`Clearing DB`);
  await prisma.policyDependants.deleteMany();
  await prisma.person.deleteMany();
  await prisma.policy.deleteMany();

  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.policy.create({
      data: u,
    })
    console.log(`Created policy with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
