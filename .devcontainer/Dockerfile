FROM mcr.microsoft.com/devcontainers/anaconda:0-3

# Clean apt cache
RUN apt-get clean

# Install additional packages needed to build pip requirements
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends \
  build-essential \
  libpcre3-dev \
  libssl-dev \
  libffi-dev

# Copy environment.yml to a temp location
COPY environment.yml /tmp/conda-tmp/

# Update shell command
SHELL ["/bin/bash", "-c"]

# Initialize conda
RUN conda init bash

# Now, change the UMASK
RUN umask 0002
# Create environment
RUN conda env create -f /tmp/conda-tmp/environment.yml
# Activate environment
RUN source /home/vscode/.bashrc && source activate beer-search-engine
# Clean up
RUN rm -rf /tmp/conda-tmp

# Install Bun
ENV BUN_INSTALL=/bun
RUN sudo mkdir -p ${BUN_INSTALL} \
  && curl -fsSL https://bun.sh/install | bash

# Update PATH
ENV PATH=${BUN_INSTALL}/bin:${PATH}