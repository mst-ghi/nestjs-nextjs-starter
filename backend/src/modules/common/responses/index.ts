import {
  TagEntity,
  LanguageEntity,
  CountryEntity,
  ProvinceEntity,
  CityEntity,
} from '@app/prisma/entities';
import { ApiProperty } from '@nestjs/swagger';

export class TagsListResponse {
  @ApiProperty({ type: [TagEntity] })
  tags: TagEntity[];
}

export class LanguagesListResponse {
  @ApiProperty({ type: [LanguageEntity] })
  languages: LanguageEntity[];
}

export class CountriesListResponse {
  @ApiProperty({ type: [CountryEntity] })
  countries: CountryEntity[];
}

export class ProvincesListResponse {
  @ApiProperty({ type: [ProvinceEntity] })
  provinces: ProvinceEntity[];
}

export class CitiesListResponse {
  @ApiProperty({ type: [CityEntity] })
  cities: CityEntity[];
}
