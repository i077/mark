{
  description = "Serverless shortlinking service";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    devshell.url = "github:numtide/devshell";
    utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, devshell, utils, ... }: utils.lib.eachDefaultSystem (system: let
    pkgs = import nixpkgs {
      inherit system;
      overlays = [ devshell.overlay ];
    };
  in {
    devShell = pkgs.devshell.mkShell {
      name = "mark-devshell";
      packages = with pkgs; [
        wrangler
        nodePackages.pnpm
      ];
    };
  });
}
