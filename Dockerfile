# ————————————————————————————————————————————
#  BASE IMAGE
# ————————————————————————————————————————————
ARG BASE_IMAGE=node:25.2.1-alpine

FROM ${BASE_IMAGE} AS base
WORKDIR /app
RUN npm i -g pnpm


# ————————————————————————————————————————————
#  DEPS (BUILD DEPS) — pro better-sqlite3 a další native moduly
# ————————————————————————————————————————————
FROM base AS deps

# Přidáme build nástroje — POZOR: jen v této fázi!
RUN apk add --no-cache python3 make g++ build-base

COPY package.json pnpm-lock.yaml ./
COPY patches patches

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm fetch


# ————————————————————————————————————————————
#  BUILDER
# ————————————————————————————————————————————
FROM deps AS builder

ARG RETROASSEMBLY_BUILD_TIME_VITE_VERSION
ENV RETROASSEMBLY_BUILD_TIME_VITE_VERSION=$RETROASSEMBLY_BUILD_TIME_VITE_VERSION
ENV SKIP_INSTALL_SIMPLE_GIT_HOOKS=true

COPY . .

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install

RUN node --run build


# ————————————————————————————————————————————
#  DEPS PRODUCTION (bez devDependencies)
# ————————————————————————————————————————————
FROM base AS deps-production

# Zase build tools — jen pro instalaci prod modulů
RUN apk add --no-cache python3 make g++ build-base

COPY package.json pnpm-lock.yaml ./
COPY patches patches

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --prod


# ————————————————————————————————————————————
#  FINAL PRODUCTION IMAGE
# ————————————————————————————————————————————
FROM ${BASE_IMAGE} AS production

WORKDIR /app

# ❗ NIC z build nástrojů zde není — nejmenší možný image
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src/databases ./src/databases
COPY --from=builder /app/dist/client ./dist/client
COPY --from=builder /app/dist/server ./dist/server
COPY --from=deps-production /app/node_modules ./node_modules

VOLUME ["/app/data"]
EXPOSE 8000

CMD ["node", "--run=start"]
