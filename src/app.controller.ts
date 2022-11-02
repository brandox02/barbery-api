import { Controller, Get } from "@nestjs/common";
import { privacyPolicyHtmlString } from "./common/privacy-policy-html-string";
import { isPublicResolver } from "./modules/auth/jwtStratedy.guard";

@Controller("/")
export class AppController {
  @isPublicResolver()
  @Get()
  privacyPolicyHtmlString(): string {
    return privacyPolicyHtmlString;
  }
}