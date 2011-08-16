require 'rubygems'
require 'base64'
require 'bitly'
Bitly.use_api_version_3

module Codify
  BITLY = Bitly.new('gumbyapp', 'R_cb27fdecff684c0e8b0804b8c193a7e9')
  ROOT = "http://gumbyapp.com"
  def self.encode(bin)
    Base64.urlsafe_encode64(bin)
  end
  
  def self.decode(enc)
    Base64.urlsafe_decode64(enc)
  end
  
  def self.url_for(code)
    encoded = encode(code)
    packed = []
    while encoded.length > 1800
      packed << BITLY.shorten("#{ROOT}/#{encoded[0...1800]}").user_hash
      start = [encoded.length, 1800].min
      encoded = encoded[start..-1]
    end
    
    if packed.length > 0
      if encoded.length > 0
        packed << BITLY.shorten("#{ROOT}/#{encoded[0...1800]}").user_hash
        start = [encoded.length, 1800].min
        encoded = encoded[start..-1]
      end
      url = "pack:#{packed.join(',')}"
    else
      url = encoded
    end
    BITLY.shorten("#{ROOT}/#{url}").short_url
  end
  
  def self.code_from(enc)
    if enc[0,5] == "pack:"
      enc = enc[5..-1]
      packed = enc.split(',')
      expanded = ""
      packed.each do |shortened|
        expanded += BITLY.expand(shortened).long_url[(ROOT.length+1)..-1]
      end
      enc = expanded
    end
    decode(enc)
  end
end