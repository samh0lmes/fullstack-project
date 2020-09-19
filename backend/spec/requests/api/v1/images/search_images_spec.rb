describe 'get /api/v1/images/search', type: :request do
  let(:search_term) { 'cat' }

  before do
    allow(ENV).
      to receive(:fetch).
      with('GIPHY_API_KEY').
      and_return('some-key')
  end

  context 'when the call to giphy is successful' do
    let(:giphy_response) do
      File.read('spec/fixtures/external/giphy/images_search_response.json')
    end

    before do
      stub_request(:get, 'https://api.giphy.com/v1/gifs/search?api_key=some-key&q=cat').
        to_return(body: giphy_response, status: 200)
    end

    it 'returns search results' do
      get "/api/v1/images/search?search_term=#{search_term}"

      expect(response.status).to be 200
      expect(JSON.parse(response.body['images'])).to match_array({
        {
          'id' => 'ES4Vcv8zWfIt2',
          'src' => 'https://media3.giphy.com/media/ES4Vcv8zWfIt2/giphy.gif?cid=96ebb03bgccnaj0w9dn6kfyxcybuygphb0s3ju6g5wkrhruy&rid=giphy.gif',
            'title' => 'cat coffee GIF by hoppip'
        },
        {
          'id' => '13CoXDiaCcCoyk',
          'src' => 'https://media1.giphy.com/media/13CoXDiaCcCoyk/giphy.gif?cid=96ebb03bgccnaj0w9dn6kfyxcybuygphb0s3ju6g5wkrhruy&rid=giphy.gif',
            'title' => 'funny cat GIF'
        }
      })
    end
  end

  context 'when the call to giphy is not successful' do
    before do
      stub_request(:get, 'https://api.giphy.com/v1/gifs/search?api_key=some-key&q=cat').
        to_return(body: 'An error occured', status: 500)
    end

    it 'returns an error' do
      get "/api/v1/images/search?search_term=#{search_term}"

      expect(response.status).to be 500
      expect(JSON.parse(response.body)).to eq({
        'message' => 'An error occured'
      })
    end
  end
end
