import { AxiosError } from "axios";

import {
    BadRequestException,
    ForbiddenException,
    InternalServerException,
    NotFoundException,
    UnauthorizedException,
    UnknownHTTPException,
} from "@/shared/errors/HTTPException";

export class HTTPExceptionAdapter {
    static fromAxiosError(error: AxiosError) {
        switch (error.response?.status) {
            case 400:
                throw new BadRequestException();
            case 401:
                throw new UnauthorizedException();
            case 403:
                throw new ForbiddenException();
            case 404:
                throw new NotFoundException();
            case 500:
                throw new InternalServerException();
            default:
                throw new UnknownHTTPException();
        }
    }
}
