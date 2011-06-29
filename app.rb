require 'rubygems'
require 'sinatra'

get "/" do
  File.open('public/index.html').read
end

get "/:encoded" do
  
end