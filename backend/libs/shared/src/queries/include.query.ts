import { Prisma } from '@prisma/client';

export const PeoplesListIncludeQuery: Prisma.UserInclude = {
  roles: {
    select: {
      key: true,
      title: true,
    },
  },
  profile: {
    include: {
      country: {
        select: {
          id: true,
          iso2: true,
          iso3: true,
          name: true,
          numeric_code: true,
          phone_code: true,
        },
      },
      province: {
        select: {
          id: true,
          name: true,
        },
      },
      avatar: {
        select: {
          id: true,
          name: true,
          type: true,
          url: true,
        },
      },
    },
  },
};

export const UserProfileIncludeQuery: Prisma.UserInclude = {
  roles: {
    select: {
      key: true,
      title: true,
    },
  },
  socials: true,
  profile: {
    include: {
      country: {
        select: {
          id: true,
          iso2: true,
          iso3: true,
          name: true,
          numeric_code: true,
          phone_code: true,
        },
      },
      province: {
        select: {
          id: true,
          name: true,
        },
      },
      avatar: {
        select: {
          id: true,
          name: true,
          type: true,
          url: true,
        },
      },
    },
  },
};
