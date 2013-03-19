Vagrant::Config.run do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
  config.vm.boot_mode = :headless

  config.vm.share_folder "v-root", "/srv", ".", :vfs => true

  config.vm.provision :shell, :inline => "apt-get update --fix-missing"
  config.vm.provision :shell, :inline => "apt-get install -q -y python-software-properties python g++ make git"
  config.vm.provision :shell, :inline => "add-apt-repository ppa:chris-lea/node.js && apt-get update"
  config.vm.provision :shell, :inline => "apt-get install -q -y nodejs"

  config.vm.customize ["modifyvm", :id, "--name", "adlawson.wesley"]
  config.vm.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
end
