import { ApiSignature } from '@app/decorators';
import { Controller, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';
import {
  LanguagesListResponse,
  TagsListResponse,
  CountriesListResponse,
  ProvincesListResponse,
  CitiesListResponse,
} from './responses';

@ApiTags('common')
@Controller('common')
export class CommonController {
  constructor(private readonly service: CommonService) {}

  @ApiResponse({ type: TagsListResponse })
  @ApiSignature({
    method: 'GET',
    path: '/tags',
    summary: 'get tags [skills] list',
  })
  async tags(): Promise<TagsListResponse> {
    return {
      tags: await this.service.tagsList(),
    };
  }

  @ApiResponse({ type: LanguagesListResponse })
  @ApiSignature({
    method: 'GET',
    path: '/languages',
    summary: 'get languages list',
  })
  async languages(): Promise<LanguagesListResponse> {
    return {
      languages: await this.service.languagesList(),
    };
  }

  @ApiResponse({ type: CountriesListResponse })
  @ApiSignature({
    method: 'GET',
    path: '/area/countries',
    summary: 'get countries list',
  })
  async countries(): Promise<CountriesListResponse> {
    return {
      countries: await this.service.countriesList(),
    };
  }

  @ApiResponse({ type: LanguagesListResponse })
  @ApiParam({ name: 'id', description: 'country id' })
  @ApiSignature({
    method: 'GET',
    path: '/area/:id/provinces',
    summary: 'get provinces list by country id',
  })
  async provinces(@Param('id') id: string): Promise<ProvincesListResponse> {
    return {
      provinces: await this.service.provincesList(id),
    };
  }

  @ApiResponse({ type: LanguagesListResponse })
  @ApiParam({ name: 'id', description: 'province id' })
  @ApiSignature({
    method: 'GET',
    path: '/area/:id/cities',
    summary: 'get cities list by province id',
  })
  async cities(@Param('id') id: string): Promise<CitiesListResponse> {
    return {
      cities: await this.service.citiesList(id),
    };
  }
}
