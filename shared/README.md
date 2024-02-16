# Shared

## Introduction

The `shared` folder contains the source code shared between the single page application (SPA, in `spa` folder) and the serverless functions (SFs) that constitute the backend of the system (in the `functions` folder).

## Structure

The shared source code consists of the following folders:

### `models`

Schema definitions.

### `data`

Static data used by the SPA and the SFs.

This data is exposed to the client and therefore must not contain any sensitive data!

### `libraries`

Functionality shared in common by the SPA and the SFs.

## Development Process

This source code is never compiled directly.

The Node Package Manager (NPM) is used only to independently track its dependencies.

A symlink to this directory exists in both the `functions` and the `spa` source code, titled `_shared_`.
Any shared functionality may simply be imported from this symlink and compiled as a part of either `functions` or `spa` project.
