require 'rubygems'
require 'sinatra'
require './codify'

get "/" do
  erb :index
end

get "/:enc" do
  enc = params[:enc]
  @code = Codify::code_from(enc)
  erb :index
end

post "/code" do
  code = params[:code]
  url = Codify::url_for(code)
  {
    url: url
  }.to_json
end