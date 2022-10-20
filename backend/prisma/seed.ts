import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const policyData: Prisma.PolicyCreateInput[] = [
  {
    provider: 'TK',
    insuranceType: 'HEALTH',
    status: 'ACTIVE',
    startDate: '2012-07-04T15:31:29Z',
    customer: {
      create: {
        firstName: 'Amanda',
        lastName: 'McPherson',
        dateOfBirth: '1977-10-16T17:54:53Z',
      },
    },
    relatives: {
      create: [
        {
          role: 'Daughter',
          relative: {
            create: {
              firstName: 'Mariette',
              lastName: 'Argyle',
              dateOfBirth: '1997-04-24T11:26:05Z',
            },
          },
        },
        {
          role: 'Father',
          relative: {
            create: {
              firstName: 'Brandyn',
              lastName: 'Argyle',
              dateOfBirth: '2006-03-17T03:35:43Z',
            },
          },
        },
      ],
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'LIABILITY',
    status: 'CANCELLED',
    startDate: '2012-03-29T01:59:13Z',
    customer: {
      create: {
        firstName: 'Mariette',
        lastName: 'Cristofanini',
        dateOfBirth: '2011-08-01T11:56:32Z',
      },
    },
  },
  {
    provider: 'DAK',
    insuranceType: 'LIABILITY',
    status: 'PENDING',
    startDate: '2013-11-15T09:58:45Z',
    customer: {
      create: {
        firstName: 'Jess',
        lastName: 'Whittle',
        dateOfBirth: '2017-08-20T14:53:21Z',
      },
    },
  },
  {
    provider: 'DAK',
    insuranceType: 'HEALTH',
    status: 'ACTIVE',
    startDate: '2020-08-16T03:24:30Z',
    customer: {
      create: {
        firstName: 'Graeme',
        lastName: 'Ternent',
        dateOfBirth: '1988-10-25T13:37:10Z',
      },
    },
  },
  {
    provider: 'AOK',
    insuranceType: 'LIABILITY',
    status: 'ACTIVE',
    startDate: '2016-04-14T02:53:58Z',
    customer: {
      create: {
        firstName: 'Valeria',
        lastName: 'Keysel',
        dateOfBirth: '1979-04-23T10:03:12Z',
      },
    },
  },

  {
    provider: 'BARMER',
    insuranceType: 'LIABILITY',
    status: 'PENDING',
    startDate: '2015-01-13T04:52:15Z',
    customer: {
      create: {
        firstName: 'Brandy',
        lastName: 'Harbour',
        dateOfBirth: '1985-02-28T12:51:27Z',
      },
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    startDate: '2017-04-26T05:32:06Z',
    customer: {
      create: {
        firstName: 'Cyrillus',
        lastName: 'Biddlecombe',
        dateOfBirth: '1978-12-03T06:33:17Z',
      },
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'HOUSEHOLD',
    status: 'DROPPED_OUT',
    startDate: '2013-03-30T19:27:54Z',
    customer: {
      create: {
        firstName: 'Haydon_1',
        lastName: 'Ballay_1',
        dateOfBirth: '2006-12-04T01:13:38Z',
      },
    },
    relatives: {
      create: [
        {
          role: 'Mother',
          relative: {
            create: {
              firstName: 'Sam_1',
              lastName: 'Penni_1',
              dateOfBirth: '1992-03-24T11:34:21Z',
            },
          },
        },
      ],
    },
  },
  {
    provider: 'AOK',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    startDate: '2020-07-21T19:40:35Z',
    customer: {
      create: {
        firstName: 'Aguste',
        lastName: 'Bilsford',
        dateOfBirth: '1997-04-24T11:26:05Z',
      },
    },
  },
  {
    provider: 'AOK',
    insuranceType: 'HEALTH',
    status: 'DROPPED_OUT',
    startDate: '2014-07-14T00:54:34Z',
    customer: {
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
    status: 'CANCELLED',
    startDate: '2021-01-12T19:24:41Z',
    customer: {
      create: {
        firstName: 'Brandyn',
        lastName: 'Argyle',
        dateOfBirth: '2006-03-17T03:35:43Z',
      },
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'LIABILITY',
    status: 'ACTIVE',
    startDate: '2015-01-13T04:52:15Z',
    customer: {
      create: {
        firstName: 'Brandy_1',
        lastName: 'Harbour_1',
        dateOfBirth: '1988-02-28T12:51:27Z',
      },
    },
  },
  {
    provider: 'BARMER',
    insuranceType: 'HOUSEHOLD',
    status: 'ACTIVE',
    startDate: '2013-03-30T19:27:54Z',
    customer: {
      create: {
        firstName: 'Haydon',
        lastName: 'Ballay',
        dateOfBirth: '2006-12-04T01:13:38Z',
      },
    },
    relatives: {
      create: [
        {
          role: 'Mother',
          relative: {
            create: {
              firstName: 'Sam',
              lastName: 'Penni',
              dateOfBirth: '1992-03-24T11:34:21Z',
            },
          },
        },
      ],
    },
  },
  {
    provider: 'AOK',
    insuranceType: 'HEALTH',
    status: 'ACTIVE',
    startDate: '2020-07-21T19:40:35Z',
    customer: {
      create: {
        firstName: 'Brandyn',
        lastName: 'Penni',
        dateOfBirth: '2006-12-04T01:13:38Z',
      },
    },
  },
  {
    provider: 'AOK',
    insuranceType: 'HEALTH',
    status: 'ACTIVE',
    startDate: '2013-03-30T19:27:54Z',
    customer: {
      create: {
        firstName: 'Haydon',
        lastName: 'Ballay',
        dateOfBirth: '2006-12-04T01:13:38Z',
      },
    },
  },
];

async function main() {
  console.log(`Empty DB before seeding`);
  await prisma.policy.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.policyRelative.deleteMany();

  console.log(`Start seeding ...`);
  for (const p of policyData) {
    const policy = await prisma.policy.create({
      data: p,
    });
    console.log(`Created policy with id: ${policy.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
